'use strict';

var jasmine = require('gulp-jasmine');
var combine = require('stream-combiner');
var coverageEnforcer = require("gulp-istanbul-enforcer");
var istanbul = require('gulp-istanbul');
var gulpOpen = require('gulp-open');

var generator = function generator(gulp, errorHandler){
    var appUnitTests = function appUnitTests(){
        
        var combined = combine(
            gulp.src('app/**/*.js'),
            istanbul()
        );
        
        combined.on('error', errorHandler);
        
        var combinedTwo = combine(
            gulp.src(['tests/app/**/*.spec.js', 'app/**/*.js']),
            jasmine(),
            istanbul.writeReports(),
            gulp.dest('coverage/')
        );
        
        combinedTwo.on('error', errorHandler);
        
        var options = {
            thresholds: {
                statements: 100,
                branches: 100,
                lines: 100,
                functions: 100
            },
            coverageDirectory: 'coverage/',
            rootDirectory: '.'
        };
        
        var combinedThree = combine(
            gulp.src('.'),
            coverageEnforcer(options),
            gulpOpen('coverage/lcov-report/index.html', {app: 'chrome'})
        );
        
        combinedThree.on('error', errorHandler);
    };
    
    var tests = {
        app: appUnitTests
    };
    
    return tests;
};

module.exports = generator;