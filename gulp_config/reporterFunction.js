'use strict';

var generator = function generator(growlerApp){
    var reporterFunction = function reporterFunction(notificationOptions, callback){
        growlerApp.register(function registerFunction(success, err){
            if(!success || err){
                return callback(null, success);
            }
            
            // Rename 'message' property to 'text'
            notificationOptions.text = notificationOptions.message;
            delete notificationOptions.message;
    
            growlerApp.sendNotification('Blurr', notificationOptions,
                function sendNotificationCallback(success, err) {
                    return callback(err, success);
                });
        });
    };
    
    return reporterFunction;
};

module.exports = generator;