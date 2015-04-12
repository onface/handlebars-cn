<!--_PAGEDATA
{
    "title": "避免自动HTML转义",
    "githubissuesid": 2,
    "keywords": "js,subexpressions,javascript",
    "description":"Handlebars 会转义HTML，你可以使用 {{{ 避免转义",
    "doc_text":"Handlebars 会转义HTML，你可以使用 {{{ 避免转义",
    "doc_link":"../expressions.html#HTML-escapes.html",
    "_template": "demo"
}
_PAGEDATA-->


将模板修改为 `{{{html}}}` 可查看避免转义后的结果

<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >

{{html}}

</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

{
   "html": "<strong>text</strong>"
}

</script>        

<!-- helper实现 -->
<script class="show" id="helper">


</script>