var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rest API' });
});


module.exports = router;
