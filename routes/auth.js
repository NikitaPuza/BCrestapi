const express = require('express');
const auth = require('../lib/functions').auth;
const router = express.Router();

router.post('/', (req, res) => {

	let credentials = req.body.user_name + ':' + req.body.token;
	console.log(req.body);
	console.log(credentials);
	credentials = new Buffer(credentials).toString('base64');
	credentials = 'Basic ' + credentials;
	console.log(credentials);
	const options = {
		host: req.body.host,
		path: '/api/v2/time',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': credentials,
			'Accept': 'application/json'
		}
	};
	auth(options)
		.then((resolved) => {
			res.json(resolved);
		})
		.catch((error) => {
			res.json(error);
		});
});
module.exports = router;