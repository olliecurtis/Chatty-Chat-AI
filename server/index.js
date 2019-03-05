/**
 *  Chatty AI Bot - Oliver Curtis 2017
 * 
 *  Index.js includes all the code required to create the express server that will 
 *  run the application and also contains methods that initialises and connects to 
 *  the API.AI API and sends the response back to the Web UI.
 * 
 */

// Include express and instantiate
var express = require('express');
var app = express();
const components = require('./components');
const fs = require('fs');

var watson = require('./NLPs/watson');
var dialogFlow = require('./NLPs/dialogFlow');

// Define the file paths for the assests
app.use(express.static(__dirname + '../../app/views')); // html
app.use(express.static(__dirname + '../../app/assets')); // js, css, images

// Here we load the web home page
app.get('/', function (request, response) {
	response.sendFile(__dirname + "../../app/views/index.html");
});

// Create our server instance
var server = app.listen(process.env.PORT || 5000, function(){
	console.log("------------------------------")
	console.log("Chatty Application is now running on port " + 5000)
	console.log("------------------------------")
});
// Initalise our socket for the server
var socket = require('socket.io')(server);

// Now the connection has been established and the message is received
// API.AI API responds to the user's message
socket.on('connection', function (client) {
	client.on('chat message', (text) => {
		switch (components.dialog) {
			case "watson":
				watson.converse(text, client);
				return;
			case "dialogflow":
				dialogFlow.converse(text, client);
				return;
			case "luis":
				console.log('LUIS placeholder');
				return;
			default:
				client.emit('bot', "Sorry, there was an error!");
				return;
		}
	});

	client.on('setComponents', (component) => {
		components.dialog = component;
		fs.writeFile("./components.json", JSON.stringify(components),
			function (err) {
				if (err) return res.send(err)
			}
		)
	});
});

