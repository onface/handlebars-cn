<!--_PAGEDATA
{
    "title": "控制换行和空格-不删除空格",
    "githubissuesid": 2,
    "keywords": "js,subexpressions,javascript",
    "description":" Handlebars 中 控制换行个空格的示例",
    "doc_text":"控制空格",
    "doc_link":"../expressions.html#expressions-whitespaccontrol-2.html",
    "_template": "demo"
}
_PAGEDATA-->

[删除空格示例](expressions-whitespaccontrol-1.html)

<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >

{{#each nav}}
  <a href="{{url}}">
    {{#if test}}
      {{title}}
    {{else}}
      Empty
    {{/if}}
  </a>
{{~/each}}

</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

{
  "nav": [
    {"url": "foo", "test": true, "title": "bar"},
    {"url": "bar"}
  ]
}

</script>        

<!-- helper实现 -->
<script class="show" id="helper">


</script>