var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Handlebars = require('hbs');
var basicAuth = require('express-basic-auth');

var index = require('./routes/index');
var get = require('./routes/get');
var put = require('./routes/post');

var app = express();

app.use(basicAuth({
    users: { 'bigcommerce': 'sellmore!' },
    challenge: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', index);
app.use('/get', get);
app.use('/post', post);


//request.get(geturl).auth("username", "password");

module.exports = app;
