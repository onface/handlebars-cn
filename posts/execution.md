<!--_PAGEDATA
{
    "title": "Handlebars 中文网：轻逻辑语义化的模板引擎",
    "github":"nimojs/handlebarsjs.org",
    "githubissuesid": 1,
    "createData": "2015-04-10",
    "keywords": "",
    "description": "轻逻辑语义化的模板引擎",
    "_template": "default"
}
_PAGEDATA-->

<!---<div id="intro">-->

传入数据，执行 Handlebars 返回 渲染后的 HTML。

```html
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);

var context = {title: "My New Post", body: "This is my first post!"}
var html    = template(context);
```
渲染结果

```html
<div class="entry">
  <h1>My New Post</h1>
  <div class="body">
    This is my first post!
  </div>
</div>
```

[示例](demo/execution-1.html)

<!---</div>-->

选项
-------

这里的 `template()` 允许传入第二个参数作为选项 

The template function can be passed an options object as the second parameter which allows for customization:


- `data` Pass in an object to define custom `@variable` private variables.
- `helpers` Pass in to provide custom helpers in addition to the globally defined helpers. 
Values defined in this object will replace any values defined in the global object for the duration of the template execution.
- `partials` Pass in to provide custom partials in addition to the globally defined partials. 
Values defined in this object will replace any values defined in the global object for the duration of the template execution.


<!-- End .contents-->