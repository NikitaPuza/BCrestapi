var express = require('express');
var router = express.Router();
var https = require('https');

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
var b1;
var catname;
var payload;

router.use('/', function (req, res, next) {
    usermethod = req.body.usermethod;
    username = req.body.username;
    token = req.body.token;
    usertest = req.body.usertest;
    catname = req.body.catname;
    storeurl = req.body.storeurl;
    geturl = "/api/v2/" + usertest + "?limit=250";

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

    payload = JSON.stringify({
        name: catname
    });
    console.log(payload);
    console.log("sending " + usermethod + " request to " + storeurl + geturl);

    https.request(options, function (response) {
        b1 = '';
        response.on('data', function (chunk) {
            b1 += chunk;
        });
        response.on('end', function () {
            console.log(res.statusCode);
            result = JSON.parse(b1);
            res.render('post', {data: result});
            console.log(result);
        });
    }).end(payload);
});
module.exports = router;