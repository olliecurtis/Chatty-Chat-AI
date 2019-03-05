const config = require("../secrets");
var dialogflow = require("dialogflow");
var drinksAPI = require("../APIs/drinksAPI");

/**
 * Method to send conversation to DialogFlow
 * @param {*} text - text input from user
 * @param {*} client - socket to send response
 */
var dialogFlow = async function(text, client) {
	// Setting the config to be used for authenticating the Sessions with DF
	let conf = {
		credentials: {
			private_key: config.dialogflow.private_key.replace(/\\n/g, "\n"),
			client_email: config.dialogflow.client_email
		}
	}
	// Creating an instance with dialogflow
  const sessionClient = new dialogflow.SessionsClient(conf);
  const sessionPath = sessionClient.sessionPath(
    config.dialogflow.appId,
    config.dialogflow.sessionId
  );

  // Making a request to dialogFlow.
  const aiReq = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: config.dialogflow.language
      }
    }
  };

	// Call DialogFlow api
	const aiResp = await sessionClient.detectIntent(aiReq);
	// If we get a result process it otherwise emit an error
  if (aiResp[0].queryResult) {
		client.emit('bot reply', callAPI(aiResp[0].queryResult));
  } else {
		client.emit('bot reply', "Sorry, there was an error!");
  }
};

/**
 * @description Function that will call a drinks API for fun
 * @param {Object} result - The result from DialogFlow
 * @returns {Object} - Either a message or a drink from the API 
 */
function callAPI(result) {
  var url = "";
  switch (result.intent.displayName) {
    case "RandomDrink":
      url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
      return drinksAPI.api(url);
    case "SpecficDrink":
      url =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
				result.metadata.entities;
				return drinksAPI.api(url);
    default:
      return result.fulfillmentText;
  }
}

module.exports.converse = dialogFlow;
