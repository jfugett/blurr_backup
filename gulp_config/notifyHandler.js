'use strict';

// we load the gulp utility module to allow us to add color to the console output
var gutil = require('gulp-util');

// just a wrapper to allow the passing of needed dependencies
var generator = function generator(reporterFunction){
    // this is just a convenience method to allow simple sending of notifications
    var notifyHandler = function notifyHandler(title, message){
        // output the message to the console
        gutil.log(gutil.colors.green(title + ': ') + message);

        // set the title and messages to the notification object
        var options = {
            title: title,
            message: message
        };
        
        // call the growler application we registered to show the notification
        reporterFunction(options, function reporterFunctionCallback(){
            return true;
        });
    };
    
    // return our method so we can reuse it in our gulp modules
    return notifyHandler;
};

// return our generator so that dependencies can be passed in
module.exports = generator;