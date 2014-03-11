'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var generator = function generator(gulp, errorHandler){
    var watchJsHint = function watchJsHint(){
        var combined = combine(
            watch({glob: paths.scripts}, function jsHintWatcher(files){
                var combinedTwo = combine(
                    files,
                    jshint(),
                    jshint.reporter(stylish),
                    jshint.reporter('fail')
                );
                
                combinedTwo.on('error', errorHandler);
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchJsHint;
};

module.exports = generator;