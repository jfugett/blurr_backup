'use strict';

var gutil = require('gulp-util');

var generator = function generator(reporterFunction){
    var errorHandler = function errorHandler(error){
        gutil.log(gutil.colors.red(error.message));
        gutil.beep();

        var options = {
            title: 'UH OH!',
            message: 'Error: ' + error.message
        };
        
        reporterFunction(options, function reporterFunctionCallback(){
            return true;
        });
    };
    
    return errorHandler;
};

module.exports = generator;