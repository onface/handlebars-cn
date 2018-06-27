<!--_PAGEDATA
{
    "title": "字符转义和数据安全性",
    "githubissuesid": 2,
    "keywords": "js,replace,javascript",
    "description":" Handlebars helpers 支持传入任意顺序的 key-value",
    "doc_text":"helpers 支持传入任意顺序的 key-value",
    "doc_link":"../expressions.html#expressions-3.html",
    "_template": "demo"
}
_PAGEDATA-->

<!-- 模板 -->
<script class="show" id="source" type="text/x-handlebars-template" >

{{{link "See more..." href=story.url class="story" title=story.text}}}

</script>

<!-- 数据 -->
<script class="show json-format-error" id="data" type="text/json">

{
    "story": {
        "text": "Handlebars 中文网",
        "url": "http://http://handlebars-cn.onface.live/"
    }
}

</script>

<!-- helper实现 -->
<script class="show" id="helper">

Handlebars.registerHelper('link', function(text, options) {
  var attrs = [];
  for (var prop in options.hash) {
    attrs.push(
        Handlebars.escapeExpression(prop) + '="'
        + Handlebars.escapeExpression(options.hash[prop]) + '"');
  }

  return new Handlebars.SafeString(
    "<a " + attrs.join(" ") + ">" + Handlebars.escapeExpression(text) + "</a>"
  );
});

</script>