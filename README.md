# Chatty-Chat AI

An application for a agnostic chatbot that will answer simple small talk

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Knowledge of NodeJS
Knowledge of NLU/NLP

To be installed before running
* [NPM](https://www.npmjs.com) - Node package manager
* [Node](https://nodejs.org/en/) - The runtime environment

You will also need to create a secrets.json file in the **server** folder so that the application can authorise to the NLU providers. A sample of what this looks like can be found [here](https://github.com/BeigeHacker/Chatty-Chat-AI/blob/master/secrets.json) 

### Installing

To get the project up and running you will need to run the following:

Install Node modules
```
cd server
npm install
```

If the above step completes without any issues you can start the project using the following
```
npm start
```

This will produce the following output
```
------------------------------
Chatty Application is now running on port 5000
------------------------------
```

## Running the tests

TBC

## Deployment

Currently this application can be deployed through Heroku

## Built With

* [dialogflow](https://www.npmjs.com/package/dialogflow) - The DialogFlow SDK
* [expressjs](https://www.npmjs.com/package/express) - The web framework for running the application
* [socket.io](https://www.npmjs.com/package/socket.io) - The realtime communication framework for sending messages async to the backend
* [watson-developer-cloud](https://www.npmjs.com/package/watson-developer-cloud) - The Watson SDK

## Contributing


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the tags on this repository. 

## Authors

* **Ollie Curtis** - *Developer* - [BeigeHacker](https://github.com/BeigeHacker)

## License
License to be confirmed

## Future Features:

* Drinks recommendation using the cocktail DB api
* Upgrade to react
* Implement MS LUIS
* Implement component library
