/**
 * Created by nikita.puzanenko on 1/25/17.
 */
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
var body;


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

router.post('/', function (req, res, next) {
    console.log("sending " + usermethod +" request to " + storeurl + geturl);
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
    console.log('end');
    newrequest.end();
    //res.render('sent', {data: result});
    res.send(result);
});
module.exports = router;