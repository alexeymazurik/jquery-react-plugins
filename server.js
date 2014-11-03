var http = require('http');
var express = require('express');

var app = express();

app.listen(3000);
console.log('Server listened at 3000...');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.status(200).sendfile('./public/templates/react.html');
});

app.get('/jquery', function(req, res) {
    res.status(200).sendfile('./public/templates/jquery.html');
});

app.get('/getData', function(req, res) {
    res.status(200).sendfile('./public/model/data.json');
});