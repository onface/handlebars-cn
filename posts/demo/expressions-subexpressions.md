<!--_PAGEDATA
{
    "title": "子表达式示例",
    "githubissuesid": 2,
    "keywords": "js,subexpressions,javascript",
    "description":" Handlebars 中 使用子表达式的示例",
    "doc_text":"子表达式",
    "doc_link":"../expressions.html#expressions-subexpressions.html",
    "_template": "demo"
}
_PAGEDATA-->

<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >

{{outer-helper (inner-helper 'abc') 'def'}}

</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

</script>        

<!-- helper实现 -->
<script class="show" id="helper">

Handlebars.registerHelper('outer-helper', function(arg1, arg2) {
	return "第一个参数是：" + arg1 + ",第二个参数是：" + arg2 + "。";
});

Handlebars.registerHelper('inner-helper', function(str) {
	// 将字符串转换为大写
	return str.toUpperCase();
});

</script>