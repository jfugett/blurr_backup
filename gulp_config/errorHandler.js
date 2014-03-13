'use strict';

// grab the gulp utility class so we can add color to our logging
var gutil = require('gulp-util');

// just a wrapper to allow the passing of needed dependencies
// rethrow just tells us whether to rethrow the error or not
var generator = function generator(reporterFunction, reThrow){
    var errorHandler = function errorHandler(error){

        // log the error message here
        gutil.log(gutil.colors.red(error.message));
        
        // just in case somebody wasn't looking at the screen but can still hear we'll emit a beep
        gutil.beep();

        // this sets up the notification content
        var options = {
            title: 'UH OH!',
            message: 'Error: ' + error.message
        };
        
        reporterFunction(options, function reporterFunctionCallback(){
            if(reThrow){
                // throw the error again here so we interrupt the application but still get the notification 
                throw error;
            } else {
                // don't rethrow the error (only used by watch tasks or tasks that we don't mind failing)
                return true;
            }

        });
    };

    // return our error handler so it can be passed into our gulp modules    
    return errorHandler;
};

// return the generator so that the dependencies can be passed in
module.exports = generator;