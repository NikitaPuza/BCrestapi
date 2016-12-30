var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');

// Create variables to use later.
var appendurl;
var username;
var token;
var storeurl;
var geturl;
var encode1;
var encode2;
var credentials;
var body;
var options;

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
        host: "www.buttstore.net",
        path: "/api/v2/orders/190",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': credentials,
            'Accept': 'application/json'
            }
        };
    console.log("sending request");

    https.get(options, function(res) {
        body = '';
        res.on('data', function(chunk){
            body +=chunk;
        });
        res.on('end', function(){
            body = JSON.parse(body);
        });
    })
    console.log(req._headers);
    res.render('sent', body);
});
module.exports = router;