'use strict';

var gutil = require('gulp-util');

var notifyHandlerGenerator = function notifyHandlerGenerator(reporterFunction){
    var notifyHandler = function notifyHandler(title, message){
        gutil.log(gutil.colors.green(title + ': ') + message);
        gutil.beep();

        var options = {
            title: title,
            message: message
        };
        
        reporterFunction(options, function(){
            return true;
        });
    };
    
    return notifyHandler;
};

module.exports = notifyHandlerGenerator;