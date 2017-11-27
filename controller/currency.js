var rest = require('../API/Restclient');
var builder = require('botbuilder');

exports.displayCurrencyData = function getCurrencyData(currency, session){
    var url = "https://api.nal.usda.gov/ndb/search/?format=json&q="+foodName+"&sort=r&max=1&offset=0&api_key=Eeb1y8szlckwtPF8QAHBFbgb0gT7ntIOL2kFbAlr";

    rest.getNutritionData(url, session,foodName, getFoodNutrition);
}