'use strict';

// include the directory cleaner to clean out files that we need to overwrite just in case
var clean = require('gulp-clean');

// include stream-combiner so we better syntax and error handling for the file streams
var combine = require('stream-combiner');

// include run-sequence to control the order of the tasks easily
var runSequence = require('run-sequence');

// include our application paths here
var paths = require('./paths');

// this is just a wrapper that allows us to pass in the modules dependencies
var generator = function generator(gulp, errorHandler){
    // setup our primary object
    var cleaner = {};
    
    // wrapper method that allows us to clean all of the test files at once
    cleaner.tests = function tests(callback){
        return runSequence(
            '_cleanJSHint',
            callback
        );
    };
    
    gulp.task('_cleanTests', cleaner.tests);

    // this task cleans out the jshint results
    cleaner.JSHint = function JSHint(){
        var combined = combine(
            gulp.src(paths.jsHintResults),
            clean()
        );
        
        combined.on('error', errorHandler);
        
        return combined;
    };
    
    gulp.task('_cleanJSHint', cleaner.JSHint);

    // return our cleaner object in case it needs to be used anywhere else
    return cleaner;
};

// return our generator
module.exports = generator;