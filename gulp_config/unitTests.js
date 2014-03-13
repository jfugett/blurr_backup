'use strict';

// include our test runner
var jasmine = require('gulp-jasmine');

// include stream-combiner for easier handling of streams and errors
var combine = require('stream-combiner');

// include our application paths
var paths = require('./paths');

// include run-sequence for order management
var runSequence = require('run-sequence');

// this is a wrapper so that the needed dependencies can be passed in
var generator = function generator(gulp, errorHandler){
    // this is our jasmine unit test task runner
    var taskRunner = function(src){
        var combined = combine(
            gulp.src(src),
            jasmine()
        );
        
        combined.on('error', errorHandler);
        
        return combined;
    };
    
    // create our base object here
    var tests = {};
    
    tests.all = function all(){
        return runSequence(
            '_unitTestsApp',
            '_unitTestsClient',
            '_unitTestsGulp',
            '_unitTestsWorkers'
        );
    };
    
    gulp.task('_unitTestsAll', tests.all);

    tests.app = function app(){
        return taskRunner(paths.appTests);
    };
    
    gulp.task('_unitTestsApp', tests.app);
    
    tests.client = function client(){
        return taskRunner(paths.clientTests);
    };
    
    gulp.task('_unitTestsClient', tests.client);
    
    tests.gulp = function gulp(){
        return taskRunner(paths.gulpTests);
    };
    
    gulp.task('_unitTestsGulp', tests.gulp);
    
    tests.workers = function workers(){
        return taskRunner(paths.workersTests);
    };
    
    gulp.task('_unitTestsWorkers', tests.workers);
    
    // return our object in case it needs to be reused
    return tests;
};

// return our generator so it can be passed in the needed dependencies
module.exports = generator;