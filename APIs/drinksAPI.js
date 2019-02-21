const https = require('https');

var apiCall = function (url) {
	https.get(url, (resp) => {
		let data = '';
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			console.log(JSON.parse(data));
		});
	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});
}

module.exports.api = apiCall;