'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');

var generator = function generator(gulp, errorHandler){
    var watchCodeComplexity = function watchCodeComplexity(){
        var combined = combine(
            gulp.src(paths.allFiles),
            watch(function lineCountWatcher(){
                gulp.start('lineCounter');
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchCodeComplexity;
};

module.exports = generator;