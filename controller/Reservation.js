var rest = require('../API/Restclient');

exports.sendReservation = function postReservation(session, PhoneNumber, date, time){
    var url = 'https://bankbotmsa.azurewebsites.net/tables/BankBot';
    rest.postReservation(url, PhoneNumber, date, time)
};

exports.displayBooking = function getBooking(session, PhoneNumber){
    var url = 'https://bankbotmsa.azurewebsites.net/tables/BankBot';
    rest.getBooking(url, session, PhoneNumber, handleBookingResponse)
    
};

exports.deleteBooking = function deleteBooking(session,PhoneNumber,date){
    var url  = 'https://bankbotmsa.azurewebsites.net/tables/BankBot';


    rest.getFavouriteFood(url,session, username,function(message,session,username){
     var   allFoods = JSON.parse(message);

        for(var i in allFoods) {

            if (allFoods[i].favouriteFood === favouriteFood && allFoods[i].username === username) {


                rest.deleteFavouriteFood(url,session,username,favouriteFood, allFoods[i].id ,handleDeletedFoodResponse)

            }
        }


    });


};

function handleBookingFoodResponse(message, session, PhoneNumber) {
    var BookingResponse = JSON.parse(message);
    var booking = [];
    for (var index in BookingResponse) {
        var phoneNumberReceived = BookingResponse[index].PhoneNumber;
        console.log(BookingResponse[index]);
        var aBooking = BookingResponse[index].date;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (PhoneNumber == phoneNumberReceived) {
            //Add a comma after all favourite foods unless last one
            if(bookingResponse.length - 1) {
                booking.push(aBooking);
            }
            else {
                booking.push(aBooking);
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", username, allFoods);                
    
}