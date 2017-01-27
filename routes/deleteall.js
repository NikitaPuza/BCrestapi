var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');
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
var usertest;
var usermethod;
var result;
var b1;
var productid;
var payload;

router.post('/', function (req, res, next) {
    usermethod = req.body.usermethod;
    username = req.body.username;
    token = req.body.token;
    usertest = req.body.usertest;
    storeurl = "www." + req.body.storeurl;
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
})


router.post('/', function (req, res) {
    console.log("sending " + usermethod + " request to " + storeurl + geturl);

    https.request(options, function (response) {
        b1 = '';
        response.on('data', function (chunk) {
            b1 += chunk;
        });
        response.on('end', function () {
            console.log(res.statusCode);
            // result = JSON.parse(b1);
            res.render('delete', {data: usertest});
            console.log(b1);
        });
    }).end();

    console.log('end');
    //res.render('sent', {data: result});
});
module.exports = router;