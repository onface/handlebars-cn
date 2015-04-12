$(function(){
    var $showerror = $('#showerror');
    var fShowError = function (str) {
        $showerror.show().html(str)
    }
    var fHeredoc = function (fn) {
      // 1. 移除起始的 function(){ /*!
      // 2. 移除末尾的 */ }
      // 3. 移除起始和末尾的空格
      return fn.toString()
          .replace(/^[^\/]+\/\*!?/, '')
          .replace(/\*\/[^\/]+$/, '')
          .replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '') // .trim()
    }
    $('script.show,textarea,show').each(function () {
        var $this = $(this);
        $this.html($.trim($this.html()));
    })

    var $result = $('#result');
    var $expandingPre = $('#expandingPre');
    var $dom = $('#dom');
    var $helper = $('#helper');
    var $data = $("#data");
    var $htmlbody = $('html,body');
    if ($data.length !== 0) {
        (function () {
            var source = $('#source').html();
            console.log('模板：\r\n');
            console.log(source);
            console.log('\r\n');

            var sData = $.trim($data.html());
            if (sData === '') {
                sData = '{}';
            }
            try {
                data  = $.parseJSON(sData);
            } catch (err) {
                $htmlbody.stop(false,true).animate({
                    'scrollTop': $data.offset().top
                })
                $data
                .fadeTo(50,.8).delay(100).fadeTo(50,1).delay(100).fadeTo(50,.8).delay(100).fadeTo(50,1)
                .delay(100).fadeTo(50,.8).delay(100).fadeTo(50,1);
                fShowError('数据源 JSON 格式错误，请仔细检查并修改，JSON 中属性名和字符串值都需要使用 "name" 包裹。<a href="http://www.w3school.com.cn/json/" target="_blank">JSON教程</a>')
                throw err;
            }

            console.log('JSON字符串：\r\n');
            console.log(sData);
            console.log('数据：\r\n')
            console.log(data);
            console.log('\r\n');

            var template = Handlebars.compile(source);
            var result = template(data);
            console.log('渲染结果：\r\n');
            console.log(result);
            if (typeof result === 'object') {
                result = result.string;
            }
            $expandingPre.html(Handlebars.escapeExpression(result));
            $result.html(result);
            $dom.html(result);
        })()
    }
})