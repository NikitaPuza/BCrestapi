var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();



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
app.use('/users', users);

/*app.post('/send', function(req, res, next) {
  res.render('send', { title: 'request sent' });
});
/*
/*app.post('/send', function(req, res) {
	var appendBaseURL = "/api/v2/";
    var username = req.body.username;
    var token = req.body.token;
    var storeurl = req.body.storeurl;
    var newurl = storeurl + appendBaseURL;
    var geturl = "https://" + newurl + "orders";
    var encode1 = username + ":" + token;
    //var encode2 = new Buffer(encode1).toString('base64');

    //var credentials = "Basic" + " " + encode2;


/*
  /*  var options = {
    		url: geturl,
    		method: 'GET',
    	    headers: {
    	    	'Authorization': credentials,
        		'Content-Type': 'application/json',
        		'Accept': 'application/xml'
    			}
			};*/

//request.get(geturl).auth("username", "password");

module.exports = app;
