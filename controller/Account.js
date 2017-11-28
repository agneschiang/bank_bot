var rest = require('../API/Restclient');

exports.displayAccountData = function getAccountData(session, username, password){
    var url = 'https://2017bankbot.azurewebsites.net/tables/BankBot';
    rest.getAccountData(url, session, username, password, handleAccountResponse)
    
};

exports.displayphonenumber = function getPhoneData(session, PhoneNumber){
    var url = 'https://2017bankbot.azurewebsites.net/tables/BankBot';
    rest.getPhoneData(url, session, PhoneNumber, handlePhoneResponse)

};

function handleAccountResponse(message, session, username, password) {
    var AccountResponse = JSON.parse(message);
    var Account = [];
    for (var index in AccountResponse) {
        var usernameReceived = AccountResponse[index].username;
        var passwordRecieved = AccountResponse[index].password;
        console.log(AccountResponse[index]);
        var checkedAcc = AccountResponse[index].CheckedAccount;
        var savedAcc = AccountResponse[index].SavedAccount;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password == passwordRecieved) {
            //Add a comma after all favourite foods unless last one
            if(Account.lenght -1){
                Account.push(checkAcc);
                Account.push(savedAcc);
            }
            else{
                Account.push(checkAcc);
                Account.push(savedAcc);
            }
        }
    }

    session.send("%s, Here is your balance: %s", username, Account)
}

function handlePhoneResponse(message, session, PhoneNumber) {
    var phoneResponse = JSON.parse(message);
    var phone = [];
    for (var index in phoneResponse) {
        var phoneRecieved = phoneResponse[index].PhoneNumber;
        console.log(phoneResponse[index]);
        var checkedAcc = phoneResponse[index].CheckedAccount;
        var savedAcc = phoneResponse[index].SavedAccount;
        var firstname = phoneResponse[index].fistname;
        var lastname = phoneResponse[index].lastname;

        if(PhoneNumber == phoneRecieved){
            if(phone.length -1){
                phone.push(checkedAcc);
                phone.push(savedAcc);
            }
            
            else{
        

                phone.push(checkedAcc);
                phone.push(savedAcc)
            }
        }
        else{
            builder.Prompts.text(session, "Yor have typed the wrong number, please try again.");
            session.beginDialog('Account');
        }
        
    }

    session.send("Here is your account detail: <br/>Checked Account: %s <br/> Saved Account: %s",  phone[0], phone[1]);

}