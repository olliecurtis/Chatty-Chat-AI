const config = require("../secrets");
var dialogflow = require("dialogflow");
const apiHandler = require('../handlers/apiHandler');

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
		if(aiResp[0].queryResult.intent.displayName.indexOf("Drink") + 1){
			client.emit('bot reply', apiHandler.callAPI(aiResp[0].queryResult.intent.displayName, null));
		} else {
			client.emit('bot reply', aiResp[0].queryResult.fulfillmentText);
		}
  } else {
		client.emit('bot reply', "Sorry, there was an error!");
  }
};

module.exports.converse = dialogFlow;
