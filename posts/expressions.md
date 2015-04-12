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
<div id="intro">
表达式是 Handlebars 模板的基本组成单位，单独使用 `{{mustache}}`，pass them to a Handlebars helper, or use them as values in hash arguments.
</div>

基本用法
-------
<!-- Start .contents-->
<!---<dic class="contents">-->

<!---<div class="bullet">-->

最简单的表达式是通过 `{{` 和 `}}` 包裹数据属性名

```html
<h1>{{title}}</h1>
```
``{{title}}``会查找当前上下文 [（上下文？）](#) 中的 `title` 属性。 Block helpers 会改变当前上下文，但他不会改变表达式的语法。


Actually, it means "look for a helper named title, then do the above", but we'll get to that soon enough.

<!---</div>-->

<!---<div class="bullet">-->

你还可以使用 `.` 查找属性的子元素

```html
<h1>{{article.title}}</h1>
```
这个示例的意思是：寻找当前上下文中的 `article` 属性，然后查找 `article` 属性的 `title` 属性。找到后输出 `title`

handlebars也支持已经弃用的 `/` 分隔符，上面的表达式也可以写成：

```html
<h1>{{article/title}}</h1>
```

<!---</div>-->

<!---<div class="bullet">-->

标识符可以是除了以下字符以外的任何 unicode 字符:

空白 `!` `"` `#` `%` `&` `'` `(` `)` `*` `+` `,` `.` `/` `;` `<` `=` `>` `@` `[` `\` `]` `^` `{` `|` `}` `~` <code>`</code>

<!---</div>-->

<!---<div class="bullet"-->

<a name="property-not-a-valid-identifier.html"></a>

如果你的标识符是特殊字符，可以使用 `[` 和 `]` 包裹标识符：

```html
{{#each articles.[10].[#comments]}}
  <h1>{{subject}}</h1>
  <div>
    {{body}}
  </div>
{{/each}}
```
模板中的 `articles.[10].[#comments]` 相当于 JavaScript 中的 `object.articles[10]["#comments"]`。[示例](demo/property-not-a-valid-identifier.html)

<div class="translator">
`articles` 也可以是对象，如果是对象则访问 `articles` 的 `10` 属性。
</div>

You may not include a closing `]` in a path-literal, but all other characters are fair game.

<!---</div>-->

<!---<div class="bullet">-->

<a name="HTML-escapes.html"></a>

Handlebars 会转义HTML，你可以使用 `{{{` 避免转义

```
{{{foo}}}
```

[示例](demo/HTML-escapes.html)

<div class="translator">
转义HTML 指的是:
<pre>
& 会被转换为 &amp;amp;
< ~ &amp;lt;
> ~ &amp;gt;
" ~ &amp;quot;
' ~ &amp;#x27;
` ~ &amp;#x60;
</pre>

</div>


<!---</div>-->

<!-- End .contents-->

Helpers
-------

<!-- Start .contents-->
<!---<dic class="contents">-->


<!---<div class="bullet"-->

Helper 语法是简单的标识符后面紧跟着一个或多个参数（用空格分隔），每个参数都是 Handlebars 表达式。

```
{{{link story}}}
```

如上示例，`link` 是 helper 的名称，`story` 是 helper 的参数。Handlebars evaluates parameters in exactly the same way described above in "Basic Usage".

<a name="SafeString-escapeExpression"></a>

```
Handlebars.registerHelper('link', function(object) {
  var url = Handlebars.escapeExpression(object.url),
      text = Handlebars.escapeExpression(object.text);

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
});
```
当一个 helper 返回 HTML 字符串 时。你应该使用 `SafeString` 来避免转义，确保输出的是可渲染的HTML。  
当使用 `SafeString` 时，应主动使用 `escapeExpression` 方法将不安全的数据过滤。

<div class="translator">
确保输出`<a>` 而不是 `&lt;a&gt;`，  
并过滤 `<span onclick="javascript:alert(1);">点击我</span>` 这这危险数据。  
若不明白请看 [示例](demo/SafeString-escapeExpression.html)
</div>

<!---</div>-->

<!---<div class="bullet"-->


<a name="expressions-1.html"></a>

你也可以向 helper 传入字符串、数字或布尔值

```
{{{link "See more..." story.url}}}
```

在这种情况下，把手将通过链接帮手两个参数：字符串“查看更多......”而在当前的背景下评估story.url的结果。

此时，Handlebars 会将字符串参数 `"See more..."` 和当前上下文的 `story.url` 传递给 helper link。

```
Handlebars.registerHelper('link', function(text, url) {
  url = Handlebars.escapeExpression(url);
  text = Handlebars.escapeExpression(text);

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
});

```
[示例](demo/expressions-1.html)


<a name="expressions-2.html"></a>

你还可以使用 `story.text` 来渲染动态文本

```
{{{link story.text story.url}}}
```

[示例](demo/expressions-2.html)

<!---</div>-->

<!---<div class="bullet"-->

<a name="demo/expressions-3.html"></a>

Handlebars helpers 支持传入任意顺序的 key-value （在本文档中被称为 hash arguments）：

```
{{{link "See more..." href=story.url class="story"}}}
```

<div class="translator">
此处 hash arguments 是 `href=story.url class="story"`。

<ul>
    <li>`href`是 key `story.url` 是 value</li>
    <li>`class`是 key `"story"` 是 value</li>
</ul>

</div>

hash arguments 必须是简单的标识符，value 必须是表达式。value 的值可以是标识符、路径和字符串。

```
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
```
<!---<div class="translator">-->

最终渲染结果：

```
<a class="story" href="http://handlebarsjs.org">See more...</a>
```

<!---</div>-->

上例中的 `options.hash` 可访问 hash arguments 。[示例](demo/expressions-3.html)


<!---</div>-->

<!---<div class="bullet"-->

Handlebars also offers a mechanism for invoking a helper with a block of the template. Block helpers can then invoke that block zero or more times with any context it chooses.

<a href="block_helpers.md" class="more-info">了解更多：块 helpers</a>

<!---</div>-->

<!-- End .contents-->


<a name="expressions-subexpressions.html"></a>

子表达式
------

<!-- Start .contents-->
<!---<dic class="contents">-->
<!---<div class="bullet">-->

Handlebars 支持子表达式, 子表达式的结果可作为父表达式的参数，字表达式使用括号分割 `(`。

```
{{outer-helper (inner-helper 'abc') 'def'}}
```

在这个示例中，`'abc'` 作为 `inner-helper` 的参数被调用，而 `inner-helper` 的返回值作为 `outer-helper` 的第一个参数被调用（`'def'` 作为第二个参数被调用）。

[示例](demo/expressions-subexpressions.html)



<!---</div>-->

<!-- End .contents-->

<a name="expressions-whitespaccontrol-1.html"></a>

控制空格
------

<!-- Start .contents-->
<!---<dic class="contents">-->
<!---<div class="bullet">-->

模板空白可由任何 mustache 语法括号中任意一侧添加 `~` 字符以删除。When applied all whitespace on that side will be removed up to the first handlebars expression or non-whitespace character on that side.

```html
{{#each nav ~}}
  <a href="{{url}}">
    {{~#if test}}
      {{~title}}
    {{~else~}}
      Empty
    {{~/if~}}
  </a>
{{~/each}}
```


数据为：

```js
{
  "nav": [
    {"url": "foo", "test": true, "title": "bar"},
    {"url": "bar"}
  ]
}
```

最终会输出无换行和空格的内容

```html
<a href="foo">bar</a><a href="bar">Empty</a>
```

[示例](demo/expressions-whitespaccontrol-1.html)

<a name="expressions-whitespaccontrol-2.html"></a>

This expands the default behavior of stripping lines that are "standalone" helpers (only a block helper, comment, or partial and whitespace).


```html
{{#each nav}}
  <a href="{{url}}">
    {{#if test}}
      {{title}}
    {{else}}
      Empty
    {{/if}}
  </a>
{{~/each}}
```

渲染结果：

```html
<a href="foo">
    bar
</a>
<a href="bar">
    Empty
</a>
```

[示例](demo/expressions-whitespaccontrol-2.html)

<!---</div>-->

<!-- End .contents-->


Id Tracking
------

<!-- Start .contents-->
<!---<dic class="contents">-->
<!---<div class="bullet">-->

Optionally, helpers can be informed of the paths that were used to lookup an argument for a given value. This mode may be enabled via the `trackIds` compiler flag.

```
{{foo bar.baz}}
```

would call the helper `foo` with the value of `bar.baz` but also will include the literal string `"bar.baz"` in the `ids` field on the `options` argument.

This can be used for future lookup of parameters should it be necessary, but does add additional overhead.

When this mode is enabled, all builtin helpers will generate a <code>[@contextPath](reference.html#data-contextPath)</code> variable that denotes the lookup path for the current context. It's highly recommended that generic helpers provide such a variable if they modify the context when executing their children.


<!---</div>-->

<!-- End .contents-->