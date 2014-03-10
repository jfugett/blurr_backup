'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var generator = function generator(gulp, errorHandler, growlerNotification){
    var watchJsHint = function watchJsHint(){
        var combined = combine(
            gulp.src(paths.scripts),
            watch(function jsHintWatcher(files){
                var combinedTwo = combine(
                    files,
                    jshint(),
                    jshint.reporter(stylish),
                    jshint.reporter('fail'),
                    growlerNotification({
                        onLast: true,
                        title: 'JSHint Finished',
                        message: 'JSHint has finished linting your files'
                    })
                );
                
                combinedTwo.on('error', errorHandler);
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchJsHint;
};

module.exports = generator;