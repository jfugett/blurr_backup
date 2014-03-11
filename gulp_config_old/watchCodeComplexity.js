'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');

var generator = function generator(gulp, errorHandler){
    var watchCodeComplexity = function watchCodeComplexity(){

        var ran = false;

        var combined = combine(
            gulp.src(paths.scripts),
            watch(function codeComplexityWatcher(){
                if(!ran){
                    ran = true;
                    gulp.start('generateComplexityReport');
                }
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchCodeComplexity;
};

module.exports = generator;
