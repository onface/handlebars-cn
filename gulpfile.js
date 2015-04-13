var config = {
    anchorClass : "glyphicon glyphicon-link"
}

var gulp = require('gulp')
var markdown = require('gulp-markdown')
var tap = require('gulp-tap')
var gutil = require('gulp-util')
var cheerio = require('gulp-cheerio')
var highlight = require('highlight.js')

var fs = require('fs')
var Handlebars = require('handlebars')
var notifier = require('node-notifier')
var path  = require('path')
var handlebarshelperis = require('handlebars-helper-is')
handlebarshelperis(Handlebars)
var server = require('gulp-server-livereload')

// .replace(rStringToRegExp,'\\$1'))
// "[]" => "\[\]"
var rStringToRegExp = /([.$^{[(|)*+?\/])/g
var fStringToPrefixRegExp = function (str) {
    return new RegExp(
            '^' + (
                    str.replace(rStringToRegExp, '\\$1')
                  )
           );
}

// 渲染数据源：为了让-include 能访问数据源，每次渲染都将数据源绑定在此对象上。
var oRenderData = {}

/*!
    让模板支持引入其他模板作为模块
    {{-include header}}
    加载 _template/header.html 到当前代码行
*/
Handlebars.registerHelper('include', function (path) {
    path = '_template/' + path + '.html'
    if (fs.existsSync(path)) {
        return Handlebars.compile(
                    new Handlebars.SafeString(
                        fs.readFileSync(path, 'utf-8')
                    ).toString()
               )(oRenderData)
    } else {
        var message = "Not find: {{include " + path + '}}'
        gutil.log(gutil.colors.red(message))
        notifier.notify({
          'title': 'Gulp Not find',
          'message': message
        });
        return new Handlebars.SafeString('<span style="color:red">' + message + '</span>')
    }
})

/*!
    比较2个参数
    {{-is a b "==" "!=="}}
*/
Handlebars.registerHelper('-is', function (a, b, yes, no) {
    return a == b?yes:no;
})


/*!
    编译 markdown
    @paths {string|array} - glob 或一个文件的绝对路径 gulp.src(paths)
    @dist {string} - 相当于 gulp.dest(dist) 中的 dist
*/

var compileMD = function (paths) {
    gulp.src(paths)
        .pipe(markdown({
            highlight: function (code) {
                return highlight.highlightAuto(code).value
            }
        }))
        .pipe(cheerio(function($, file){
            var $titles = $('h1,h2,h3,h4,h5,h6')
            $titles.removeAttr('id')
            var $a = $('a')
            $a.each(function () {
                var $this = $(this)
                var target = $this.attr('target');                
                if (!target){
                    $this.attr('target', '_blank')
                }
            })
        }))
        .pipe(tap(function (file) {
            oRenderData = {
                URL_PATH: file.path.replace(fStringToPrefixRegExp(__dirname),'')
            }
            var html = file.contents.toString()
            // 将 <a href="demo.md"> 替换为 <a href="demo.html">
            html = html.replace(/(href=['"][^"']+\.)md(['"])/g,'$1html$2')
            // 将 <!-- #hash_demo --> 转换为锚记 <a href="#hash_demo" name="hash_demo"></a>
            // oHash 用于防止 hash 重复
            // 将 <!---<dic class="contents">--> 替换为 <dic class="contents"> (因为官方文档中存在一些带 class 的 div，此处需要兼容官方文档样式)
            html = html.replace(/<!---([^-]+)-->/g,'$1')
            var oHash = {}
            html = html.replace(/<!--\s*#([^\s*]+)\s*-->/g, function () {
                var hash = arguments[1];
                if (oHash[hash]) {
                    gutil.log(gutil.colors.red(hash + 'is repeated'))
                    notifier.notify({
                      'title': 'hash repeated',
                      'message': Handlebars.escapeExpression(arguments[0])
                    })
                } else {
                    oHash[hash] = true;
                }
                return '<a href="#' + hash + '" name="' + hash + '" class="' + config.anchorClass +' gulp-page-anchor" aria-hidden="true" ></a>'
            })
            /*!
            获取 markdown 中的 JSON信息，做为 _template/*.html 模板的渲染数据
            <!--_PAGEDATA
            {
                "title": "页面标题",
                "github":"nimojs/gulp-page",
                "githubissuesid": 1,
                "createData": "2015-04-10",
                "keywords": "关键词，以 , 为分隔符",
                "description": "页面描述",
                "_template": "default"
            }
            _PAGEDATA-->
            */
            html = html.replace(/<\!--\_PAGEDATA([\s\S]*)?\_PAGEDATA-->/, function () {
                try {
                    var pagedata  = JSON.parse(arguments[1])
                    for (var key in pagedata) {
                        oRenderData[key] =  pagedata[key]
                    }
                } catch (err) {
                    gutil.log(gutil.colors.red(message))
                    notifier.notify({
                      'title': ' Not find',
                      'message': message
                    });
                }

                // 取到 JSON 后删除 <!--_PAGEDATA ... _PAGEDATA--> 
                return '';
            })

            // 将渲染数据的 content 属性定义为 *.md 编译后的 html
            oRenderData.content = html
            oRenderData._template = oRenderData._template || 'default'
            var templatePath = '_template/' + oRenderData._template + '.html'
            var filename = path.basename(file.path)
            if (fs.existsSync(templatePath)) {
                var template = fs.readFileSync(templatePath, 'utf-8')
                template = template.replace(/\{\{\s*content\s*\}\}/g,'{{{content}}}')
                                    .replace(/\{\{\s*include([^}]+)\}\}/g,'{{{$1}}}')
                var output = Handlebars.compile(template)(oRenderData)
                file.contents = new Buffer(output)
                gutil.log('Markdown ' + gutil.colors.green(filename))
            } else {
                var message = "Not find:" + templatePath + '(' + filename + ')'

                gutil.log(gutil.colors.red(message))
                notifier.notify({
                  'title': 'Gulp Not find',
                  'message': message
                });
                file.contents = new Buffer(message)
            }
            
        }))
        .pipe(gulp.dest(function(file) {
            return file.base.replace(fStringToPrefixRegExp(__dirname + '/posts'), __dirname)
        }))
}

gulp.task('watch-markdown', function () {
    gulp.watch('**/*.md', function (event) {
        compileMD(event.path)        
    })
})

gulp.task('watch-handlebars', function () {
    gulp.watch('_template/*.html', function (event) {
        compileMD(['*.md','!(node_modules/**/*)'])
    })
})

gulp.task('posts', function (){
    compileMD('posts/**/*.md')
})

gulp.task('reload', function () {
    gulp.src('./')
    .pipe(server({
        livereload: true,
        directoryListing: true,
        defaultFile: 'index.html',
        open: true
    }))
})


gulp.task('default',['watch-markdown', 'watch-handlebars', 'reload'])

