var rest = require('../API/RestClient');
var builder = require('botbuilder');

exports.displayMap = function getMapData(bank, region, session){
    var url = 'https://api.yelp.com/v3/businesses/search?term='+ bank +'&location='+region + '&limit=5';
    var auth = 'BjSvhpAZ84uttmEOPzgkkUEo6HVIBwG_0aO00tZuQmuYfADZdoPPt3CY81ocUsWMbI8mG5DZsEu0hBD1-Ke2vn4JJQS3I9AWBnRIcTDi6g6mILuBseEVXYA16hEWWnYx';
    rest.getMapData(url,auth,session,displayAddress);
}


function displayAddress(message, session) {
    var attachment = [];
    var location = JSON.parse(message);
    
    //For each restaurant, add herocard with name, address, image and url in attachment
    for (var index in location.businesses) {
        var location = location.businesses[index];
        var name = location.name;
        var imageURL = location.image_url;
        var url = location.url;
        var address = restaurant.location.address1 + ", " + restaurant.location.city;

        var card = new builder.HeroCard(session)
            .title(name)
            .text(address)
            .images([
                builder.CardImage.create(session, imageURL)])
            .buttons([
                builder.CardAction.openUrl(session, url, 'More Information')
            ]);
        attachment.push(card);

    }

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}