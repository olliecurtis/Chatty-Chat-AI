const watsonSdk = require("watson-developer-cloud/assistant/v1");
const config = require("../secrets");
const apiHandler = require("../handlers/apiHandler");

var watson = async function(text, client) {
  var assistant = new watsonSdk({
    version: config.watson.version,
    username: config.watson.username,
    password: config.watson.password,
    url: config.watson.url
  });

  assistant.message(
    {
      workspace_id: config.watson.workspace_id,
      input: { text: text }
    },
    function(err, response) {
      if (err) {
        console.log("error:", err);
        client.emit("bot reply", "Sorry, there was an error!");
      } else {
        if (response.intents[0].intent.indexOf("Drink") + 1) {
          client.emit(
						"bot reply",
						apiHandler.callAPI(response.intents[0].intent, response.entities)
          );
        } else {
          client.emit("bot reply", response.output.text);
        }
      }
    }
  );
};

module.exports.converse = watson;
