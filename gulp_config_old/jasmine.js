'use strict';

var jasmine = require('gulp-jasmine');
var combine = require('stream-combiner');
var coverageEnforcer = require('gulp-istanbul-enforcer');
var istanbul = require('gulp-istanbul');
var gulpOpen = require('gulp-open');
var paths = require('./paths');
var clean = require('gulp-clean');
var runSequence = require('run-sequence')
var fs = require('fs');

var generator = function generator(gulp, errorHandler){
    gulp.task('cleanCoverage', function cleanCoverage(){
        
        var cleaned = combine(
            gulp.src([
                'coverage/lcov.info',
                'coverage/coverage-final.json',
                'coverage/*.js',
                'coverage/lcov-report/app/**/*.html'
            ]),
            clean({force: true})
        );
        
        cleaned.on('error', errorHandler);
    });
    
    var temp = function(){
        var combined = combine(
                    gulp.src('app/**/*.js'),
                    istanbul()
                );
            
                combined.on('error', errorHandler);
            
                var combinedTwo = combine(
                    gulp.src(paths.appJSFiles),
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
    
    var appUnitTests = function appUnitTests(){
        
        runSequence(
            ['cleanCoverage'],
            function(){
                setTimeout(temp, 1000);
            }
        );
    };
    
    var tests = {
        app: appUnitTests
    };
    
    return tests;
};

module.exports = generator;