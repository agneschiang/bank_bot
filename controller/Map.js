var rest = requite('../API/RestClient');
var builder = require('botbuilder');

exports.displayMap = function getMapData(address, location, session){
    var url = 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=bank+in+AucklandCBD&key=AIzaSyDie9CKPxtuO1RuAwm8EGGaLMPMmnjQc6A';
    var auth = 'AIzaSyAHOjRKY1dDlGqvDjR6ZydD-OcWC-fxykE';
    rest.getMapData(url, auth, session, displayMap);
}

function displayMap(message, session){
    var attachment = [];
    var map = JSON.parse(message);

    for (var index in )
}