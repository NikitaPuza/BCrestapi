const https = require('https');

exports.get = (options) => {
	return new Promise((resolve) => {
		https.request(options, response => {
			let responseBody = '';
			response.on('data', chunk => {
				responseBody += chunk;
			});
			response.on('end', () => {
				console.log(response.statusCode);
				console.log(responseBody);
				resolve(responseBody);
			});
		}).end();
	});        
};