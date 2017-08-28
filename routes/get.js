const express = require('express');
const get = require('../lib/functions').get;
const router = express.Router();

router.post('/', (req, res) => {

	let credentials = 'nikitapuzanenko:314dc1b9bfac6db6d203c4b92e3563d941e40f54';
	credentials = new Buffer(credentials).toString('base64');
	credentials = 'Basic ' + credentials;
	console.log(credentials);
	const options = {
		host: 'https://store-r8lu9.mybigcommerce.com',
		path: '/api/v2/time',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': credentials,
			'Accept': 'application/json'
		}
	};
	get(options)
		.then((resolved) => {
			res.send(resolved);
		})
		.catch((error) => {
			res.send(error);
		});
});
module.exports = router;