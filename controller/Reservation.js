var rest = require('../API/Restclient');

exports.sendReservation = function postReservation(session, PhoneNumber, date, time){
    var url = 'https://2017bankbot.azurewebsites.net/tables/BankBot';
    rest.postReservation(url, PhoneNumber, date, time)
};

exports.displayBooking = function getBookingData(session, PhoneNumber, time){
    var url = 'https://2017bankbot.azurewebsites.net/tables/BankBot';
    rest.getBookingData(url, session, PhoneNumber, time,  handleBookingResponse)
    
};

exports.deleteBooking = function deleteBooking(session,PhoneNumber,time){
    var url  = 'https://2017bankbot.azurewebsites.net/tables/BankBot';


    rest.getBookingData(url, session, PhoneNumber, time, function(message,session, PhoneNumber, time){
     var   Booking = JSON.parse(message);

        for(var i in Booking) {

            if (Booking[i].time === time && Booking[i].PhoneNumber === PhoneNumber) {


                rest.deleteBooking(url,session,PhoneNumber,time, Booking[i].id ,handleDeletedFoodResponse)

            }
        }


    });


};

function handleBookingResponse(message, session, PhoneNumber, time) {
    var BookingResponse = JSON.parse(message);
    var booking = [];
    for (var index in BookingResponse) {
        var phoneNumberReceived = BookingResponse[index].PhoneNumber;
        var timeRecieved = BookingResponse[index].time;
        console.log(BookingResponse[index]);
        var bookingDate = BookingResponse[index].date;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (PhoneNumber == phoneNumberReceived && time == timeRecieved) {
            //Add a comma after all favourite foods unless last one
            if(booking.length - 1) {
                booking.push(bookingDate);
            }
            else {
                booking.push(bookingDate);
            }
            session.send("Your booking is at %s", booking[0]);    
        }     
    }
    
            
    
}

function handleDeletedFoodResponse(body,session, PhoneNumber, time){
    
            console.log('Done');
    
    
    }