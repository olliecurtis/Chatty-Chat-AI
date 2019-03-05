var drinksAPI = require("../APIs/drinksAPI");
/**
 * @description Function that will call a drinks API for fun
 * @param {Object} result - The result from DialogFlow
 * @returns {Object} - Either a message or a drink from the API 
 */
function callAPI(intent, entities) {
  var url = "";
  switch (intent) {
    case "RandomDrink":
      url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
      return drinksAPI.api(url);
    case "SpecficDrink":
      url =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
				entities;
				return drinksAPI.api(url);
    default:
      return "Unable to process drinks request";
  }
}

module.exports.callAPI = callAPI;