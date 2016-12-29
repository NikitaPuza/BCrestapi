var express = require('express');
var router = express.Router();
var request = require('request');
var https = require('https');


/* GET users listing. */
router.post('/', function(req, res, next) {
	var appendBaseURL = "/api/v2/";
    var username = req.body.username;
    var token = req.body.token;
    var storeurl = req.body.storeurl;
    var newurl = storeurl + appendBaseURL;
    var geturl = newurl + "orders";
    var encode1 = username + ":" + token;
    var encode2 = new Buffer(encode1).toString('base64');
    var credentials = "Basic" + " " + encode2;
    var info = null;
    console.log(credentials + " sent to " + geturl);

    var options = {
    uri: geturl,
    method: 'GET',
    port: 443,
    headers: {
        'Content-Type': 'application/json',
        'Authentication': credentials
        }
    };

    https.request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        console.log(body);
        }
    });
    res.json(info);
});
module.exports = router;