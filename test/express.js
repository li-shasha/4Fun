/**
 * Created by sli on 01/02/18.
 */
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require("fs");
var index = fs.readFileSync('ex.html');


var csrfProtection = csrf({cookie: true});
var parseForm = bodyParser.urlencoded({extended: false});

var app = express();

app.use(cookieParser());

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(index);
})
app.get('/form', csrfProtection, function(req, res) {
    res.render('send', {csrfToken: req.csrfToken()})
});

app.post('/process', parseForm, csrfProtection, function(req, res) {
    res.send('data is being processed')
});

app.listen(1000)

