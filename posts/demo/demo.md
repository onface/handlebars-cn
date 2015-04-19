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
{{#nimo}}
{{.}} {{root.a.b.c}}
{{/nimo}}
</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">
{
    "a":{
        "b":{
            "c":"cccc"
        }
    },
    "nimo": [
        1
        ,
        2
    ]
}
</script>        

<!-- helper实现 -->
<script class="show" id="helper">
Handlebars.registerHelper('helper-name', function(obj) {
    return 'output'
    
});
</script>