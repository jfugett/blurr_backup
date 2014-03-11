'use strict';

var gutil = require('gulp-util');

var generator = function generator(reporterFunction){
    var notifyHandler = function notifyHandler(title, message){
        gutil.log(gutil.colors.green(title + ': ') + message);
        gutil.beep();

        var options = {
            title: title,
            message: message
        };
        
        reporterFunction(options, function reporterFunctionCallback(){
            return true;
        });
    };
    
    return notifyHandler;
};

module.exports = generator;