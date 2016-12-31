var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');


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
var usrmethod;
var body;

router.post('/', function(req, res, next) {
    appendurl = "/api/v2/";
    usrmethod = req.body.usrselect;
    username = req.body.username;
    token = req.body.token;
    storeurl = "www." + req.body.storeurl;
    geturl = appendurl + "orders" + "/190";
    encode1 = username + ":" + token;
    encode2 = new Buffer(encode1).toString('base64');
    credentials = "Basic" + " " + encode2;

    console.log('generated variables');
    next()
})

router.post('/', function(req, res, next) {
    console.log("next");
        options = {
        host: storeurl,
        path: geturl,
        method: usrmethod,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': credentials,
            'Accept': 'application/json'
            }
        };
    console.log("sending request");

  var newrequest = https.request(options, function(res) {
        body = '';
        res.on('data', function(chunk){
            body +=chunk;
        });
        res.on('end', function(){
            console.log(res.statusCode);
            //body = JSON.parse(body);
        });
    })
    newrequest.end();
    console.log(newrequest._headers);

    res.render('sent', {title: 'Result', data: JSON.stringify(body) });
});
module.exports = router;