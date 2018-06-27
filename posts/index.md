<!--_PAGEDATA
{
    "title": "Handlebars 中文网：轻逻辑语义化的模板引擎",
    "github":"onface/handlebars-cn",
    "githubissuesid": 1,
    "createData": "2015-04-10",
    "keywords": "",
    "description": "轻逻辑语义化的模板引擎",
    "_template": "default"
}
_PAGEDATA-->

<div id="intro">

你可以使用 Handlebars 轻松的创建语义化模板。  
Handlebars 兼容 Mustache 模板。你可以在 Handlebars 中直接使用 Mustache 模板。

</div>
<a class="download" href="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v3.0.1.js">Download: 3.0.1</a>
<a class="download-runtime" href="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime-v3.0.1.js">Download: runtime-3.0.1</a>

快速入门
---------------

<!---<dic class="contents">--><!-- Start .contents-->
  
Handlebars 模板看起来很像 HTML ，Handlebars 表达式嵌入在 HTML 中。
  
```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
```

Handlebars 表达式以 `{{`属性名`}}` 的方式插入数据。

<a href="expressions.md" class="more-info">高级教程：表达式</a>

---------------------

你可以在 HTML 中使用 `<script>` 标签存放模板

```html
<script id="entry-template" type="text/x-handlebars-template">
  <div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
  </div>
</script>
```

---------------------

在 JavaScript 中获取 `<scrit>` 中的模板并编译模板

```javascript
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
```

<!---<div class="translator">-->
建议初学者跳过预编译章节
<!---</div>-->

还可以预编译你的模板。预编译后的模板只需使用 [handlebars.runtime.js](http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime-v3.0.0.js) 渲染，这样可以提高性能并减少文件大小。在移动设备中这样做非常有意义（因为移动设备的性能和网络状态都没有PC好）。


<a href="precompilation.md" class="more-info">高级教程：预编译</a>

---------------------

传入数据，执行 Handlebars 返回 渲染后的 HTML。

```js
var source   = $("#entry-template").html();
var template = Handlebars.compile(source);

var context = {title: "My New Post", body: "This is my first post!"};
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

<a href="execution.md" class="more-info">高级教程: 执行</a>

HTML 转义
-------------

遇到 HTML标签时 Handlebars 会返回转义后的 HTML，如果你不希望被转义，可以使用 `{{{`

```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{{body}}}
  </div>
</div>
```

渲染数据：

```js
{
  title: "All about <p> Tags",
  body: "<p>This is a post about &lt;p&gt; tags</p>"
}
```

渲染结果：

```html
<div class="entry">
  <h1>All About &lt;p&gt; Tags</h1>
  <div class="body">
    <p>This is a post about &lt;p&gt; tags</p>
  </div>
</div>
```

<a href="#SafeString" name="SafeString"></a>

Handlebars 不会转义 `Handlebars.SafeString` 。如果你自定义了一个 helper 返回 HTML 代码，你需要返回 `new Handlebars.SafeString(result)` ，那么你需要手动对内容进行转义

```js
Handlebars.registerHelper('link', function(text, url) {
  text = Handlebars.Utils.escapeExpression(text);
  url  = Handlebars.Utils.escapeExpression(url);

  var result = '<a href="' + url + '">' + text + '</a>';

  return new Handlebars.SafeString(result);
});
```

`new Handlebars.SafeString()` 会标识传入参数是“安全的”，所以即使你不使用 `{{{` 。Handlebars 也不会转义。

[示例](demo/SafeString.md)


块表达式
-------

块表达式允许你定义helper，用不同的数据上下文（context）调用一段模板。下面我们定义一个生成列表的helper：

快表达式允许你自定义 helper，使用当前传入参数作为上下文调用模板。

创建一个用于生产列表的快表达式

```
{{#list people}}{{firstName}} {{lastName}}{{/list}}
```

渲染数据如下所示：

```js
{
  people: [
    {firstName: "Yehuda", lastName: "Katz"},
    {firstName: "Carl", lastName: "Lerche"},
    {firstName: "Alan", lastName: "Johnson"}
  ]
}
```

we would create a helper named `list` to generate our HTML list. The helper receives the `people` as its first parameter, and an options hash as its second parameter. The options hash contains a property named `fn`, which you can invoke with a context just as you would invoke a normal Handlebars template.

```js
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});
```

When executed, the template will render:

```html
<ul>
  <li>Yehuda Katz</li>
  <li>Carl Lerche</li>
  <li>Alan Johnson</li>
</ul>
```

Block helpers have more features, such as the ability to create an else section (used, for instance, by the built-in if helper).

Since the contents of a block helper are escaped when you call `options.fn(context)`, Handlebars does not escape the results of a block helper. If it did, inner content would be double-escaped!

<a href="block_helpers.md" class="more-info">Learn More: Block Helpers</a>

Handlebars Paths
----------------

Handlebars supports simple paths, just like Mustache.

```html
<p>{{name}}</p>
```

Handlebars also supports nested paths, making it possible to look up properties nested below the current context.

```html
<div class="entry">
  <h1>{{title}}</h1>
  <h2>By {{author.name}}</h2>

  <div class="body">
    {{body}}
  </div>
</div>
```

That template works with this context


```
var context = {
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
};
```

This makes it possible to use Handlebars templates with more raw JSON objects.

Nested handlebars paths can also include `../` segments, which evaluate their paths against a parent context.



```html
<h1>Comments</h1>

<div id="comments">
  {{#each comments}}
  <h2><a href="/posts/{{../permalink}}#{{id}}">{{title}}</a></h2>
  <div>{{body}}</div>
  {{/each}}
</div>
```

Even though the link is printed while in the context of a comment, it can still go back to the main context (the post) to retrieve its permalink.

The `../` path segment references the parent template scope, not one level up in the context. This is because block helpers can invoke a block with any context, so the notion of "one level up" isn't particularly meaningful except as a reference to the parent template scope.



Handlebars also allows for name conflict resolution between helpers and data fields via a this reference:

```html
<p>{{./name}} or {{this/name}} or {{this.name}}</p>
```

Any of the above would cause the `name` field on the current context to be used rather than a helper of the same name.


Template comments with {{!-- --}} or {{! }}.
---------------------------------------------

You can use comments in your handlebars code just as you would in your code. Since there is generally some level of logic, this is a good practice.

```html
<div class="entry">
  {{!-- only output this author names if an author exists --}}
  {{#if author}}
    <h1>{{firstName}} {{lastName}}</h1>
  {{/if}}
</div>
```

The comments will not be in the resulting output. If you'd like the comments to show up. Just use html comments, and they will be output.

```html
<div class="entry">
  {{! This comment will not be in the output }}
  <!-- This comment will be in the output -->
</div>
```

Any comments that must contain `}}` or other handlebars tokens should use the `{{!-- --}}` syntax.

Helpers
-------

Handlebars helpers can be accessed from any context in a template. You can register a helper with the `Handlebars.registerHelper` method.

```html
<div class="post">
  <h1>By {{fullName author}}</h1>
  <div class="body">{{body}}</div>
  <h1>Comments</h1>
  {{#each comments}}
  <h2>By {{fullName author}}</h2>
  <div class="body">{{body}}</div>
  {{/each}}
</div>
```


when using this context and helpers:

```js
var context = {
  author: {firstName: "Alan", lastName: "Johnson"},
  body: "I Love Handlebars",
  comments: [{
    author: {firstName: "Yehuda", lastName: "Katz"},
    body: "Me too!"
  }]
};

Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});
```

results in:

```html
<div class="post">
  <h1>By Alan Johnson</h1>
  <div class="body">I Love Handlebars</div>
  <h1>Comments</h1>
  <h2>By Yehuda Katz</h2>
  <div class="body">Me Too!</div>
</div>
```


Helpers receive the current context as the `this` context of the function.

```html
<ul>
  {{#each items}}
  <li>{{agree_button}}</li>
  {{/each}}
</ul>
```

when using this context and helpers:

```js
var context = {
  items: [
    {name: "Handlebars", emotion: "love"},
    {name: "Mustache", emotion: "enjoy"},
    {name: "Ember", emotion: "want to learn"}
  ]
};

Handlebars.registerHelper('agree_button', function() {
  var emotion = Handlebars.escapeExpression(this.emotion),
      name = Handlebars.escapeExpression(this.name);

  return new Handlebars.SafeString(
    "<button>I agree. I " + emotion + " " + name + "</button>"
  );
});
```

results in:

```html
<ul>
  <li><button>I agree. I love Handlebars</button></li>
  <li><button>I agree. I enjoy Mustache</button></li>
  <li><button>I agree. I want to learn Ember</button></li>
</ul>
```

If your helper returns HTML that you do not want escaped, make sure to return a new Handlebars.SafeString.



Built-In Helpers
----------------

Handlebars offers a variety of built-in helpers such as the if conditional and each iterator.

<a href="builtin_helpers.md" class="more-info">Learn More: Built-In Helpers</a>


API Reference
-------------

Handlebars offers a variety of APIs and utility methods for applications and helpers.

<a href="reference.md" class="more-info">Learn More: API Reference</a>


<!---</div>--><!-- End .contents