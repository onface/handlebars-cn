<!--_PAGEDATA
{
    "title": "Handlebars 执行渲染",
    "github":"onface/handlebars-cn",
    "githubissuesid": 1,
    "createData": "2015-04-10",
    "keywords": "",
    "description": "轻逻辑语义化的模板引擎",
    "_template": "demo"
}
_PAGEDATA-->


<script id="entry-template" type="text/x-handlebars-template" class="show">
<!-- 模板 -->
<div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
</div>
</script>

<script class="show">
// 编译模板
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
</script>

<script class="show">
// 数据
var data = {
    title: "My New Post",
    body: "This is my first post!"
}
// 渲染
$(function () {
	var html = template(data);
	$("#result,#dom").html(html);
})
</script>

<style>
#expandingPre{
    height: 200px;
}
</style>

