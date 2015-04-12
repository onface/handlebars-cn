<!--_PAGEDATA
{
    "title": "深入理解JavaScript-replace",
    "githubissuesid": 2,
    "keywords": "js,replace,javascript",
    "description":"本文详细介绍了 JavaScript 中 replace 的三种使用方法",
    "doc_text":"demo",
    "doc_link":"../index.html",
    "_template": "demo"
}
_PAGEDATA-->

<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >
{{{link "See more..." story.url}}}
</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">
{
    "story": {
        "url": "http://www.handlebarsjs.org"
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