var rest = require('../API/Restclient');
var builder = require('botbuilder');

exports.displayCurrencyData = function getCurrencyData(currency, session){
    var url = "http://www.apilayer.net/api/live?access_key=cb9ffcc6b2cdefca06e2fe407556b0d6&currencies=" + currency;
    rest.getCurrency(url, session, currency, handleCurrencyResponse);
}

function handleCurrencyResponse(message, session, currency){
    var attachment = [];
    var currencies = JSON.parse(message);

    for (var index in currencies){
        var currency = currencies[index].quotes;

        var card = new builder.HeroCard(session)
        .title('USD')
        .text(currency)
    attachment.push(card);


    }
    var message = new builder.Message(session)
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments(attachment);
session.send(message);
}