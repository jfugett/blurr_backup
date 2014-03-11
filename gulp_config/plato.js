'use strict';

var fs = require('fs');
var plato = require('gulp-plato');
var combine = require('stream-combiner');
var paths = require('./paths');

var generator = function generator(gulp, errorHandler){
    var generateComplexityReport = function generateComplexityReport(){
        var jsHintrc = JSON.parse(fs.readFileSync('.jshintrc', 'utf8'));

        var combined = combine(
            gulp.src(paths.scripts),
            plato('./test_results/complexity_report/', {
                jshint: {
                    'options': jsHintrc,
                    'globals': jsHintrc.globals
                },
                complexity: {
                    'format': 'markdown',
                    newmi : true
                }
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return generateComplexityReport;
};

module.exports = generator;