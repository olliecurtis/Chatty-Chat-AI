var drinksAPI = require("../APIs/drinksAPI");
/**
 * @description Function that will call a drinks API for fun
 * @param {Object} result - The result from DialogFlow
 * @returns {Object} - Either a message or a drink from the API
 */
async function callAPI(intent, entities) {
  var url = "";
  switch (intent) {
    case "RandomDrink":
      url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
      var result = await drinksAPI.api(url);
      return formatDrink(result);
    case "SpecficDrink":
      url =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + entities;
      return drinksAPI.api(url);
    default:
      return "Unable to process drinks request";
  }
}

function formatDrink(result) {
  const drinkResponse = result.body;
  const drink = drinkResponse.drinks[0];
  const ingredients = [];
  for (i = 1; i <= 15; i++) {
    const ingStr = "strIngredient" + i;
    const measStri = "strMeasure" + i;
    if (drink[measStri] && drink[ingStr]) {
      ingredients.push(drink[measStri] + drink[ingStr]);
    }
  }
  const drinkSteps = {
    name: drink.strDrink,
    glass: drink.strGlass,
    ingredients: ingredients,
    instructions: drink.strInstructions,
    image: drink.strDrinkThumb
  }

  return drinkSteps;
}

module.exports.callAPI = callAPI;
