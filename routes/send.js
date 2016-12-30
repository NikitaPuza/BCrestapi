var express = require('express');
var router = express.Router();
var request = require('request');
var https = require('https');

var appendurl;
var username;
var token;
var storeurl;
var geturl;
var encode1;
var encode2;
var credentials;
var info;
var options;

/* GET users listing. */
router.post('/', function(req, res, next) {
	appendurl = "/api/v2/";
    username = req.body.username;
    token = req.body.token;
    storeurl = req.body.storeurl;
    geturl = appendurl + "orders";
    encode1 = username + ":" + token;
    encode2 = new Buffer(encode1).toString('base64');
    credentials = "Basic" + " " + encode2;

    console.log('generated variables');
    next()
})

router.post('/', function(req, res, next) {
    console.log("next");
        options = {
        host: "buttstore.net",
        path: "/api/v2/orders",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': credentials
            }
        };
        console.log(options);
    console.log(credentials + " sending to " + geturl);

    https.request(options, function(error, response, body) {
       // info = JSON.parse(body);
        console.log(info);
    });
    res.json(info);
});
module.exports = router;