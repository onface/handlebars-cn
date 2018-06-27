<!--_PAGEDATA
{
    "title": "helper 的数据安全性",
    "githubissuesid": 2,
    "keywords": "js,handlebars,javascript",
    "description":" Handlebars 中使用 helper 输出链接",
    "doc_text":"使用 helper 输出链接",
    "doc_link":"../expressions.html#SafeString-escapeExpression",
    "_template": "demo"
}
_PAGEDATA-->


使用 `escapeExpression` 配合 `SafeString` 输出链接



<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >

{{{link story}}}

</script>


<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

{
    "story": {
        "link": "http://http://handlebars-cn.onface.live//demo/SafeString-escapeExpression.html",
        "text": "字符转义和数据安全性 <span onclick='javascript:alert(1);'>点击我</span>"
    }
}

</script>        

<!-- helper实现 -->
<script class="show" id="helper">

Handlebars.registerHelper('link', function(object) {
    // 使用 escapeExpression 进行 HTML 转义防止内容中存在 js 注入等不安全信息
    var url = Handlebars.escapeExpression(object.url);
    var text = Handlebars.escapeExpression(object.text);
    // var text = object.text; // 将此行取消注释以查看被注入 js 的结果

    // 输出时使用 SafeString ，确保 <a 不会被转义为 &lt;a
    return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
    );
});

</script>