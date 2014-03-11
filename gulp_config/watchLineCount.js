'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');

var generator = function generator(gulp, errorHandler){
    var watchCodeComplexity = function watchCodeComplexity(){

	var ran = false;

        var combined = combine(
            gulp.src(paths.scripts),
            watch(function lineCountWatcher(){
                if(!ran){
                    ran = true;
                    gulp.start('lineCounter');
		}
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchCodeComplexity;
};

module.exports = generator;
