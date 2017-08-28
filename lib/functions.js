const https = require('https');

exports.get = (options) => {
	return new Promise((resolve, reject) => {
		https.request(options, response => {
			let response_body = {
				authenticated:'no',
				bigcommerce_return:''
			};
			response.on('data', chunk => {
				response_body.bigcommerce_return += chunk;
			});
			response.on('end', () => {
				let data;
				try {
					data = JSON.parse(response_body.bigcommerce_return);
				} catch (error) {
					console.log('Cannot parse JSON');
				}
				if (data.time) {
					response_body.authenticated = 'yes';
					console.log(response_body);
					resolve(response_body);
				} else {
					reject('cannot authenticate user');
				}
			});
		}).end();
	});        
};