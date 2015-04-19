<!--_PAGEDATA
{
    "title": "HTML 转义配合 SafeString",
    "githubissuesid": 2,
    "keywords": "js,handlebars,javascript",
    "description":" Handlebars 中使用 helper 输出链接",
    "doc_text":"HTML 转义配合 SafeString",
    "doc_link":"../index.html#SafeString",
    "_template": "demo"
}
_PAGEDATA-->

<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >
{{{link "<em>html</em>" "http://www.handlebarsjs.org"}}}
</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

</script>        

<!-- helper实现 -->
<script class="show" id="helper">
Handlebars.registerHelper('link', function(text, url) {
    // 将下行 text = ... 注释以查看未作安全性转义导致的文字倾斜效果
    text = Handlebars.Utils.escapeExpression(text);
    url  = Handlebars.Utils.escapeExpression(url);

    var result = '<a href="' + url + '">' + text + '</a>';

    return new Handlebars.SafeString(result);
});
</script>