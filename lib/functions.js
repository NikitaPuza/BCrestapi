const https = require('https');
//function for AUTH
exports.auth = (options) => {
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
				console.log(data);
				if (data.time) {
					response_body.authenticated = 'yes';
					resolve(data);
				} else {
					reject('cannot authenticate user');
				}
			});
		}).end();
	});        
};

exports.get = (options, item, id) => {
	return new Promise((resolve, reject) => {
		if (id !== undefined) {
			const new_path = options.path + item + '/' + id;
			options.path = new_path;
		}
		if (id == undefined) {
			const new_path = options.path + item;
			options.path = new_path;
		}
		https.request(options, response => {
			let response_body = {
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
				if (data) {
					resolve(data);
				} else {
					reject('error occured');
				}
			});
		}).end();
	});       
};

exports.post = (options, item, id) => {
	return new Promise((resolve, reject) => {
		if (id !== undefined) {
			const new_path = options.path + item + '/' + id;
			options.path = new_path;
		}
		if (id == undefined) {
			const new_path = options.path + item;
			options.path = new_path;
		}
		https.request(options, response => {
			let response_body = {
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
				if (data) {
					resolve(data);
				} else {
					reject('error occured');
				}
			});
		}).end();
	});       
};