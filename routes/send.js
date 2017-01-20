var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');
var parallel = require("async/parallel");
var app = express()

// Create variables to use later.
var appendurl;
var username;
var token;
var storeurl;
var geturl;
var encode1;
var encode2;
var credentials;
var options;
var usermethod;
var useritem;
var result;
var body;

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})


router.post('/', function (req, res, next) {
	usermethod = req.body.usermethod;
    console.log(usermethod);
	useritem = req.body.useritem;
	username = req.body.username;
	token = req.body.token;
	storeurl = "www." + req.body.storeurl;
	geturl = "/api/v2/products/846/images";
	encode1 = username + ":" + token;
	encode2 = new Buffer(encode1).toString('base64');
	credentials = "Basic" + " " + encode2;

	next()
})

router.post('/', function (req, res, next) {
	console.log("next");
	options = {
		host: storeurl,
		path: geturl,
		method: usermethod,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': credentials,
			'Accept': 'application/json'
		}
	};
	console.log("sending request");
	var newrequest = https.request(options, function (res) {
        body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function () {
			console.log(res.statusCode);
			result = JSON.parse(body);
		});
	});
	newrequest.end();
	console.log(result);

	res.render('sent', result);
});
module.exports = router;