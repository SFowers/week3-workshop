var express = require('express');
var formidable = require('formidable');
var app = express();
var http = require('http').Server(app);
var bodyparser = require('body-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("My First Nodejs Server!");
    console.log("Server listening on: " + host + " port: " + port);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/loginform.html')
});

app.get('/account', function(req, res) {
    res.sendFile(__dirname + '/www/account.html')
});

app.post('/api/login', function(req, res) {
    let users = [{'email':'abc@gmail.com', 'password':'123'}, 
                {'email':'def@gmail.com', 'password':'123'}, 
                {'email':'ghi@gmail.com', 'password':'123'}];

    if(!req.body) {
        return res.sendStatus(400);
    }

    var customer = {};
    customer.email = req.body.email;
    customer.upwd = req.body.upwd;
    customer.valid = false;
    
    for (let i=0; i<users.length;i++) {
        if(req.body.email == users[i].email && req.body.upwd == users[i].upwd) {
            customer.valid = true;
        }
    }

    res.send(customer);
    //res.sendFile(__dirname + '/www/account.html')
});

app.get('/test', function(req, res) {
    res.sendFile(__dirname + '/www/test.html')
});

/*
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
*/