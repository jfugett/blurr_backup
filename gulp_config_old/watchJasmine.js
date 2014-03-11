'use strict';

var paths = require('./paths');
var watch = require('gulp-watch');

var generator = function generator(gulp, errorHandler){
    var watchAppUnitTests = function watchAppUnitTests(){

        watch({glob: paths.appJSFiles}, function changeAppUnitTestWatcher(files){
            files.on('end', function(){
                gulp.start('appUnitTests');
            });
        });
    };
    
    var tests = {
        app: watchAppUnitTests
    };
    
    return tests;
};

module.exports = generator;