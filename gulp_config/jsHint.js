'use strict';

var combine = require('stream-combiner');
var paths = require('./paths.js');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var generator = function generator(gulp, errorHandler){
    var jsHint = function jsHint(){
        var combined = combine(
            gulp.src(paths.scripts),
            jshint(),
            jshint.reporter(stylish),
            jshint.reporter('fail')
        );
        
        combined.on('error', errorHandler);
        
        return combined;
    };
    
    return jsHint;
};

module.exports = generator;