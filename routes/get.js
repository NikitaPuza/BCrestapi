var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');
var json2csv = require('nice-json2csv');


// Create variables to use later.
var username;
var token;
var storeurl;
var geturl;
var encode1;
var encode2;
var credentials;
var options;
var usertest;
var usermethod;
var result;
var body;
var csvBody;


router.use('/', bodyParser.json());

router.use('/', function (req, res, next) {
	usermethod = req.body.usermethod;	
	username = req.body.username;
	token = req.body.token;
	usertest = req.body.usertest;
	storeurl = req.body.storeurl;
	geturl = "/api/v2/" + usertest;

	encode1 = username + ":" + token;
	encode2 = new Buffer(encode1).toString('base64');
	credentials = "Basic" + " " + encode2;
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
	next()
});

router.use('/', function (req, res) {
        console.log("sending " + usermethod + " request to " + storeurl + geturl);
        https.request(options, function (response) {
            body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                console.log(res.statusCode);
                result = JSON.parse(body);
             //   csvBody = json2csv.convert(body);
             //   console.log(csvBody);
				res.render('sent', {data: result});
              //  res.csv(csvBody, 'GET.csv');
                console.log('end');
            });
        }).end();
	//res.render('sent', {data: result});
   // res.send(result);
});
module.exports = router;