'use strict';

var plato = require('gulp-plato');
var combine = require('stream-combiner');
var paths = require('./paths');

var generator = function generator(gulp, errorHandler){
    var generateComplexityReport = function generateComplexityReport(){
        var combined = combine(
            gulp.src(paths.scripts),
            plato('./test_results/complexity_report/', {
                complexity: {
                    format: 'markdown',
                    maxfod: 15,
                    maxcost: 40,
                    maxsize: 20,
                    minmi: 100,
                    maxcyc: 10,
                    maxcycden: 20,
                    maxhd: 10,
                    maxhv: 400,
                    maxhe: 4000
                }
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return generateComplexityReport;
};

module.exports = generator;