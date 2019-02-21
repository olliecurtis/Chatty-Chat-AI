const config = require('../secrets');
// Create an instance of the API.AI using a generated application id
var apiai = require('apiai')(config.dialogflow.appId);

var drinksAPI = require('../APIs/drinksAPI');

/**
 * Method to send conversation to DialogFlow
 * @param {*} text - text input from user
 * @param {*} client - socket to send response
 */
var dialogFlow = function (text, client) {
	// Setting the test request for the AI
	var aiReq = apiai.textRequest(text, {
		// Our sessionId is a random arbitry string
		sessionId: config.dialogflow.sessionId
	});
	// Sending the AI response back to the UI
	aiReq.on('response', (response) => {
		var textRes = response.result.fulfillment.speech;
		// callAPI(response.result)
		client.emit('bot reply', callAPI(response.result));
	});
	// Show an error to user
	aiReq.on('error', (error) => {
		client.emit('bot', "Sorry, there was an error!");
	});
	// End the request
	aiReq.end();
}

function callAPI(result) {
	var url = '';
	switch (result.metadata.intentName) {
		case "RandomDrink":
			url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
			return drinksAPI.api(url);
		case "SpecficDrink":
			url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + result.metadata.entities;
		default:
			return result.fulfillment.speech;
	}
}

module.exports.converse = dialogFlow;