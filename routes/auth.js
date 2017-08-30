const express = require('express');
const Bigcommerce = require('../lib/bigcommerce');
const router = express.Router();

router.post('/', (req, res) => {
	let credentials = req.body.user_name + ':' + req.body.token;

	credentials = new Buffer(credentials).toString('base64');
	credentials = 'Basic ' + credentials;
	Bigcommerce.time(req.body.host, credentials)
		.then((resolved) => {
			res.json(resolved);
		})
		.catch((error) => {
			res.json(error);
		});
});
module.exports = router;