var express = require('express');
var formidable = require('formidable');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/www'));

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("My First Nodejs Server!");
    console.log("Server listening on: " + host + " port: " + port);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html')
});
app.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
    });
    form.on('file', function (name, file) {
        console.log("Uploaded " + file.name);
    })

    res.sendFile(__dirname + '/www/index.html')
});

app.get('/test', function(req, res) {
    res.sendFile(__dirname + '/www/test.html')
});

app.get('/account', function(req, res) {
    res.sendFile(__dirname + '/www/account.html')
});
