'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');

var generator = function generator(gulp, errorHandler){
    var watchChangeLog = function watchChangeLog(){

        var ran = false;

        var combined = combine(
            gulp.src(paths.scripts),
            watch(function changeLogWatcher(){
                if(!ran){
                    ran = true;
                    gulp.start('generateChangeLog');
                }
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchChangeLog;
};

module.exports = generator;
