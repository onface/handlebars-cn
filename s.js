var app = require('express')()
app.use(require('express').static('./'))
var port = 4784
app.listen(port, function () {
    console.log('127.0.0.1:' + port)
})
