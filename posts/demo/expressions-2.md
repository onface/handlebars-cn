<!--_PAGEDATA
{
    "title": "字符转义和数据安全性",
    "githubissuesid": 2,
    "keywords": "js,replace,javascript",
    "description":" Handlebars 中 helper 接受两个标识符作为参数的示例",
    "doc_text":"你还可以使用 story.text 来渲染动态文本",
    "doc_link":"../expressions.html#expressions-2.html",
    "_template": "demo"
}
_PAGEDATA-->

<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >

{{{link story.text story.url}}}

</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

{
    "story": {
        "text": "Handlebars 中文网",
        "url": "http://handlebars-cn.onface.live/"
    }
}

</script>        

<!-- helper实现 -->
<script class="show" id="helper">

Handlebars.registerHelper('link', function(text, url) {
    url = Handlebars.escapeExpression(url);
    text = Handlebars.escapeExpression(text);

    return new Handlebars.SafeString(
        "<a href='" + url + "'>" + text + "</a>"
    );
});

</script>