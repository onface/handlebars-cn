<!--_PAGEDATA
{
    "title": "表达式的属性包含特殊字符时的使用方法",
    "githubissuesid": 2,
    "keywords": "js,handlebars,javascript",
    "description":" Handlebars 中表达式的属性包含特殊字符时的使用方法",
    "doc_text":"如果你的表达式的标识符是特殊字符，可以使用 [ 和 ] 包裹标识符",
    "doc_link":"../expressions.html#property-not-a-valid-identifier.html",
    "_template": "demo"
}
_PAGEDATA-->


如果你的表达式的标识符是特殊字符，可以使用 [ 和 ] 包裹标识符



<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >

{{#each articles.[1].[#comments]}}
  <h1>{{subject}}</h1>
  <div>
    {{body}}
  </div>
{{/each}}

</script>

（注意：为了查看方便，此示例将 `10` 改为 `1` ）

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

{
    "articles": [
        {
            "#comments": [
                {
                    "subject": "1-1 标题",
                    "body": "内容"
                },
                {
                    "subject": "1-2 标题",
                    "body": "内容"
                }
            ]
        },
        {
            "#comments": [
                {
                    "subject": "2-1 标题",
                    "body": "内容"
                },
                {
                    "subject": "2-2 标题",
                    "body": "内容"
                }
            ]
        }
    ]
}

</script>        

<!-- helper实现 -->
<script class="show" id="helper">


</script>