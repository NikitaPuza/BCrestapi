var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Handlebars = require('hbs');
var basicAuth = require('express-basic-auth');

var index = require('./routes/index');
var get = require('./routes/get');
var post = require('./routes/post');
var del = require('./routes/delete');
var delall = require('./routes/deleteall');

var app = express();

app.use(basicAuth({
    users: { 'bigcommerce': 'sellmore!' },
    challenge: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', index);
app.use('/get', get);
app.use('/post', post);
app.use('/delete', del);
app.use('/deleteall', delall);


//request.get(geturl).auth("username", "password");

module.exports = app;
