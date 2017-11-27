var request = require("request");

exports.getCurrencynData = function getData(url, session, currency, callback){
    
        request.get(url, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, currency, session);
            }
        });
    };

exports.getAccountData = function getData(url, session, username, password, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username, password);
        }
    });
};

exports.getPhoneData = function getData(url, session, PhoneNumber, callback){
    
        request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, session, PhoneNumber);
            }
        });
    };