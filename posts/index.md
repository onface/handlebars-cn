<!--_PAGEDATA
{
    "title": "Handlebars 中文网：轻逻辑语义化的模板引擎",
    "github":"nimojs/handlebarsjs.org",
    "githubissuesid": 1,
    "createData": "2015-04-10",
    "keywords": "",
    "description": "轻逻辑语义化的模板引擎",
    "_template": "default"
}
_PAGEDATA-->

<div id="intro">

你可以使用 Handlebars 轻松的创建语义化模板。  
Handlebars 兼容 Mustache 模板。你可以在 Handlebars 中直接使用 Mustache 模板。

</div>
<a class="download" href="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v3.0.1.js">Download: 3.0.1</a>
<a class="download-runtime" href="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime-v3.0.1.js">Download: runtime-3.0.1</a>

Getting Started
---------------

<!-- Start .contents-->
<!---<dic class="contents">-->

<!---<div class="bullet">-->

Handlebars 模板看起来很像 HTML ，Handlebars 表达式嵌入在 HTML 中。
  
```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
```
Handlebars 表达式以 `{{`属性名`}}` 的方式插入数据。

<a href="expressions.md" class="more-info">了解更多：表达式</a>

<!---</div>-->

<a name="index-1.html"></a>

<!---<div class="bullet">-->

你可以在 HTML 中使用 `<script>` 标签存放模板

```html
<script id="entry-template" type="text/x-handlebars-template">
  <div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
  </div>
</script>
```

<!---</div>-->

<!---<div class="bullet">-->

在 JavaScript 中获取 `<scrit>` 中的模板并编译模板

```javascript
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
```

[示例](demo/index-1.html)

还可以预编译你的模板。预编译后的模板只需使用 [handlebars.runtime.js](http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime-v3.0.0.js) 渲染，这样可以提高性能并减少文件大小。在移动设备中这样做非常有意义（因为移动设备的性能和网络状态都没有PC好）。

<a href="#" class="more-info">了解更多：预编译</a>

<!---</div>-->

<!---</div>-->
<!-- End .contents-->