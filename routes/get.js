const express = require('express');
const Bigcommerce = require('../lib/bigcommerce');
const router = express.Router();

router.post('/', function(req, res) {

	let credentials = req.body.user_name + ':' + req.body.token;
	credentials = new Buffer(credentials).toString('base64');
	credentials = 'Basic ' + credentials;


	Bigcommerce.get(req.body.host, credentials, req.body.item, req.body.id)
		.then((resolved) => {
			res.json(resolved);
		})
		.catch((error) => {
			res.json(error);
		});
});


module.exports = router;
