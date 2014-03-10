'use strict';

var combine = require('stream-combiner');
var paths = require('./paths.js');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var jsHintGenerator = function jsHintGenerator(gulp, errorHandler, growlerNotification){
    var jsHint = function jsHint(){
        var combined = combine(
            gulp.src(paths.scripts),
            jshint(),
            jshint.reporter(stylish),
            jshint.reporter('fail'),
            growlerNotification({
                onLast: true,
                title: 'JSHint Finished',
                message: 'JSHint has finished linting your files'
            })
        );
        
        combined.on('error', errorHandler);
        
        return combined;
    };
    
    return jsHint;
};

module.exports = jsHintGenerator;