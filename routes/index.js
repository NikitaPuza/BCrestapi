var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rest API' });
});
/* GET /send 
app.post('/send', function(req, res, next) {
	res.render('send', { title: 'request sent' });
}); */
module.exports = router;