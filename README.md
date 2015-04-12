[Handlebars 中文网](http://www.handlebarsjs.org/)
================

[handlebras](http://handlebarsjs.com/) 官方文档的中文版

- 中文版：[http://www.handlebarsjs.org](http://www.handlebarsjs.org/)
- 英文版：[http://www.handlebarsjs.com](http://www.handlebarsjs.com/)

## 直接提交 [issues](https://github.com/nimojs/handlebarsjs.org/issues) 报告翻译错误
打开 [issues](https://github.com/nimojs/handlebarsjs.org/issues/new) ，填写翻译错误对应的 URL 地址、错误文字、正确文字，原因。

## 使用 gulp 参与编辑

1. Fork 此项目
1. 使用 Github Clone 到本地
2. 打开命令行/终端
3. 跳转至对应目录
4. 命令行输入 `npm install`
5. 输入 `gulp` 回车
6. 开始监控 `/post/**/*.md` 文件修改，当 `*.md` 文件被修改时，将自动同步 对应的 `/**/*.html` 文件。

修改完成后使用 github 发送 pull requests

### HTML 特殊处理

因为官方英文文档中夹杂着一些带 class 的 `<div>` 所以通过 replace 做了一个替换。
```html
<!---<div class="bullet">-->

Handlebars 模板看起来很像 HTML ，Handlebars 表达式嵌入在 HTML 中。
```

```js
html = html.replace(/<!---([^-]+)-->/g,'$1')
```

可查看 [/posts/index.md](https://github.com/nimojs/handlebarsjs.org/edit/master/posts/index.md) 的源码以理解 `<!---<tag>-->` 的用法。
