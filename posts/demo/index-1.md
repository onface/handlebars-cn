<!--_PAGEDATA
{
    "title": "Handlebars 中文网：轻逻辑语义化的模板引擎",
    "github":"nimojs/handlebarsjs.org",
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
	"title": "Handlebars 中文网",
    "body": "用 Handlebars 抛弃低效率的 HTML 拼接吧！"
}
// 渲染
$(function () {
	var html = template(data);
	$("#result,#dom").html(html);

	// 通过 pre 让 textarea 高度自适应，与 Handlebars 无关
	$("#expandingPre").html(Handlebars.escapeExpression(html));
})
</script>

