var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/70cf5534-311f-483a-a5e4-87fe75ba1906?subscription-key=5d65b5a6c5b749548b818b417b32c9d6&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('OfficeHour', function (session, args) {
        if (!isAttachment(session)) {

            // Pulls out the time entity from the session if it exists
            var timeEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'time');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('The opening hour is %s...', timeEntity.entity);
               // Here you would call a function to get the office hour for that day information

            } else {
                session.send("Sorry I don't quite understand! Please try again");
            }
        }
    }).triggerAction({
        matches: 'OfficeHour'
    });
}