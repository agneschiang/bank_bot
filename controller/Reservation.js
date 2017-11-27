var rest = require('../API/RestClient');

exports.sendReservation = function postReservation(session, PhoneNumber, date, time){
    var url = 'http://bankbotmsa.azurewebsites.net/tables/BankBot';
    rest.postReservation(url, PhoneNumber, date, time)
};