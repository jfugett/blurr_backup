'use strict';

var combine = require('stream-combiner');
var sloc = require('gulp-sloc');
var paths = require('./paths');
var runSequence = require('run-sequence');

var generator = function generator(gulp, errorHandler){
    var lineCounterFile = function lineCounterFile(){
        var combined = combine(
            gulp.src(paths.allFiles),
            sloc({
                tolerant: true,
                reportType: 'json',
                reportFile: 'lineCount.json'
            }),
            gulp.dest('./test_results/')
        );
        
        combined.on('error', errorHandler);
        
        return combined;
    };
    
    var lineCounterConsole = function lineCounterConsole(){
        var combinedTwo = combine(
            gulp.src(paths.allFiles),
            sloc({
                tolerant: true
            })
        );
        
        combinedTwo.on('error', errorHandler);
        
        return combinedTwo;
    };
    
    var lineCounter = function lineCounter(){
        return runSequence(
            'lineCounterFile',
            'lineCounterConsole'
        );
    };
    
    var returnObject = {
        lineCounter: lineCounter,
        lineCounterConsole: lineCounterConsole,
        lineCounterFile: lineCounterFile
    };
    
    return returnObject;
};

module.exports = generator;