var request = require("request-promise");

var apiCall = async function(url) {
	return request({
		uri: url,
		method: 'GET', 
		resolveWithFullResponse: true,
		json: true
	})
};

module.exports.api = apiCall;
