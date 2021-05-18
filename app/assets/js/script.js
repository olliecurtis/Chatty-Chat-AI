/**
 *  Chatty AI Bot - Oliver Curtis 2017
 *
 *  script.js includes all the code required to capture voice or text input from the 'Human' user
 *  Within this script there are functions to capture events when buttons are pressed and also
 *  handle the posting of the input to the AI API and on successful response deliver to the UI
 *
 */

// Invoke an instance of SpeechRecognition, the controller interface of the Web Speech API for voice recognition
// var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
// var rec = new SpeechRec();

// Start speech recognition on button click
// document.querySelector("#listener").addEventListener("click", () => {
//   rec.start();
// });

// Retrieve the speech result as text
// This returns a SpeechRecognitionResult list that contains the result
// so we can retrieve the text in the array
// rec.addEventListener("result", event => {
//   var last = event.results.length - 1;
//   var input = event.results[last][0].transcript;
//   // Send the input to the Socket
//   sendChat(input);
// });

// Stop listening to voice input
// rec.addEventListener("speechend", () => {
//   rec.stop();
// });

// Instantiate Socket.IO
var socket = io();

// Send the chat on clicking enter
document.querySelector("#in-field").addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    // Obtain the value from the field
    var input = document.getElementById("in-field").value;
    // Send the input to the Socket
    sendChat(input);
  }
});

// Send the chat input on clicking the message button
document.querySelector("#message").addEventListener("click", () => {
  // Obtain the value from the field
  var input = document.getElementById("in-field").value;
  // Send the input to the Socket
  sendChat(input);
});

// Function that generates a synthetic voice and
// responds to the user
socket.on("bot reply", function(reply) {
  // Instantiate a new instance of Speech
  var synth = window.speechSynthesis;
  // Instantiate a new Speech Utterance - this will create the output voice
  var utterance = new SpeechSynthesisUtterance();
  utterance.text = reply;
  // Respond with voice to the user
  synth.speak(utterance);
  // Add the Chatbot response to the page
  setChat("Chatty", reply);
});

// Send the chat input on clicking the message button
document.querySelector("#dialogflow").addEventListener("click", () => {
  // Send the chat message to the web socket
  socket.emit("setComponents", "dialogflow");
});
// Send the chat input on clicking the message button
document.querySelector("#luis").addEventListener("click", () => {
  // Send the chat message to the web socket
  socket.emit("setComponents", "luis");
});
// Send the chat input on clicking the message button
document.querySelector("#watson").addEventListener("click", () => {
  // Send the chat message to the web socket
  socket.emit("setComponents", "watson");
});

// This function sends the Chat input to the Socket
// Input: The received message from either speech or text
function sendChat(textInput) {
  if (textInput) {
    // Set the input on the screen
    setChat("Human", textInput);
    // Send the chat message to the web socket
    socket.emit("chat message", textInput);
  } else {
    setChat("Error", "You have not provided an input");
  }
}

// This function sets the chat message based upon the input
// Input:
//  User: This is either the bot or the human input
//  Message: This is the input or output from the chat
function setChat(user, message) {
  // Create a <p> node
  var node = document.createElement("P");
  // Create a text node to hold the message
  var textnode = document.createTextNode(user + ": " + message);
  // Add the text node to our new paragraph
  node.appendChild(textnode);
  //Add the paragraph to the chat window
  document.getElementById("chat-window").appendChild(node);
  // Here ensures that the chat window scrolls to the bottom
  document.getElementById("chat-window").scrollTop = document.getElementById(
    "chat-window"
  ).scrollHeight;
  // Reset the input field
  document.getElementById("in-field").value = "";
}
