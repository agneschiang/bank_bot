var builder = require('botbuilder');
var balance = require('./Account');
var reserv = require('./Reservation');
//var isAttachment = false;
//const botbuilder = require('something');
//const fbTemplete = botBuilder.fbTemplete;
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
            if (timeEntity) {
                session.send('Here is the opening hour <br /> Mon - Thur: 8:00AM - 5:00PM <br /> Fri: 8:00AM - 6:60PM <br /> Sat - Sun: Closed');
               // Here you would call a function to get the office hour for that day information

            } else {
                session.send("Sorry I don't quite understand! Please try again");
            }
        }
    }).triggerAction({
        matches: 'OfficeHour'
    });

    bot.dialog('Account', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["PhoneNumber"]) {
                builder.Prompts.text(session, "Enter a PhoneNumber ");       

            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {
                if (results.response) {
                    session.conversationData["PhoneNumber"] = results.response;
                }

                session.send("Retrieving your Account");
                balance.displayphonenumber(session, session.conversationData["PhoneNumber"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }
        }
    ]).triggerAction({
        matches: 'Account'
    });

    bot.dialog('Reservation', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["PhoneNumber"]) {
                builder.Prompts.text(session, "Enter a Phone number to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["PhoneNumber"] = results.response;
                }
                // Pulls out the food entity from the session if it exists
                var bookingEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'booking');
                var timeEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'bookingDate');
    
                // Checks if the food entity was found
                if (bookingEntity && timeEntity) {
                    session.send('Your booking confirm: <br> Time: \%s\ <br/> Date: \%s\.' , bookingEntity.entity, timeEntity.entity);
                    reserv.sendReservation(session, session.conversationData["PhoneNumber"], bookingEntity.entity, timeEntity.entity); // <-- LINE WE WANT
    
                } else {
                    session.send("No food identified!!!");
                }
            }
        }
                    
        
    ]).triggerAction({
        matches: 'Reservation'
    });

    bot.dialog('DisplayBooking', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["PhoneNumber"]) {
                builder.Prompts.text(session, "Enter a Phone number to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["PhoneNumber"] = results.response;
                }
                var checkingEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'check');
                var dateEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'bookingDate');

                if(checkingEntity && dateEntity){

                
                    session.send("Your booking on the \%s\ is... ", dateEntity.entity);
                    reserv.displayBooking(session, session.conversationData["PhoneNumber"], dateEntity.entity);
                }
            }
        }
    ]).triggerAction({
        matches:'DisplayBooking'
    });


    bot.dialog('DeleteBooking', [function (session, args, next) {
        
                    session.dialogData.args = args || {};
                    if (!session.conversationData["PhoneNumber"]) {
                        builder.Prompts.text(session, "Enter a Phone Number to setup your account.");
                    } else {
                        next(); // Skip if we already have this info.
                    }
                },
                function (session, results,next) {
                        if (!isAttachment(session)) {
                            if (results.response){
                                session.conversationData['PhoneNumber'] = results.response;
                            }
        
                            session.send("You want to delete your booking.");
        
                            // Pulls out the food entity from the session if it exists
                            var cancelEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'cancel');
                            var dateEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'bookingDate');
                            
        
                            // Checks if the for entity was found
                            if (cancelEntity && dateEntity) {
                                session.send('Deleting \'%s\'...', cancelEntity.entity);
                                food.deleteBooking(session,session.conversationData['PhoneNumber'], dateEntity.entity); //<--- CALLL WE WANT
                            } else {
                                session.send("No food identified! Please try again");
                            }
                        }
        
            }
                // Insert delete logic here later
            ]).triggerAction({
                matches: 'DeleteBooking'
        
            });

    bot.dialog('Transaction', function (session, args) {
        if (!isAttachment(session)) {

            // Pulls out the time entity from the session if it exists
            var transactionEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'transaction');

            // Checks if the for entity was found
            if (transactionEntity) {
                session.send('Here is the instruction <br />');
               // Here you would call a function to get the office hour for that day information

            } else {
                session.send("Sorry I don't quite understand! Please try again");
            }
        }
    }).triggerAction({
        matches: 'Transaction'
    });

    

    //bot.dialog('Location', function (session, args){
        //if(!isAttachment(session)){
            //var locationEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'place');
           // module.exports = botBuilder{      
            //if(locationEntity){
              //  return new fbTemplate.Button('Please select one of the area')
              //  .addButton('Auckland CBD', "Auckland CBD")
               // .addButton('NewMArket', 'NewMarket')
               // .addButton('East Auckland', 'East Auckland')
               // .get();
           // }
           // else {
            //    session.sned("Sorry I don't quite understand! Please try again");
           // }
        //}
   // }

  //  }).triggerAction({
   //     matches: 'Location'
   // });

    


    bot.dialog('WelcomeIntent', function (session, args){
        // Insert logic here later
        if(!isAttachment(session)){
            
                        //Pull out the food entity from the session if it exists
                        var welcomeEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'welcome');
            
                        // Checks if the for entity was foud
                        session.send("Hi, how can I help you")
                    }
    }).triggerAction({
        matches: 'WelcomeIntent'
    });

}

function isAttachment(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        
        //call custom vision here later
        return true;
    }
    else {
        return false;
    }
}