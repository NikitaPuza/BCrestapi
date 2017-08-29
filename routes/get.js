const express = require('express');
const get = require('../lib/functions').get;
const router = express.Router();

router.post('/', function(req, res) {

	let credentials = req.body.user_name + ':' + req.body.token;
	credentials = new Buffer(credentials).toString('base64');
	credentials = 'Basic ' + credentials;
	const options = {
		host: req.body.host,
		path: '/api/v2/',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': credentials,
			'Accept': 'application/json'
		}
	};
	get(options, req.body.item, req.body.id)
		.then((resolved) => {
			res.json(resolved);
		})
		.catch((error) => {
			res.json(error);
		});
});


module.exports = router;
