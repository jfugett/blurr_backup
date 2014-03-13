'use strict';

// include our testing framework
var mocha = require('gulp-mocha');

// include our application paths
var paths = require('./paths');

// include run-sequence for order management
var runSequence = require('run-sequence');

// this is a wrapper so that the needed dependencies can be passed in
var generator = function generator(gulp, errorHandler){

    // this is our mocha unit test task runner
    var taskRunner = function(src){
        // we have to handle this stream in this manner do to oddities in the way mocha works
        return gulp.src(src, {read: false})
            .pipe(mocha({ ui: 'bdd', reporter: 'list', bail: false }))
            .on('error', function(error){
                errorHandler(error);
            });
    };
    
    // create our base object here
    var tests = {};
    
    // this is just a shorthand for running all of the unit tests at once
    tests.all = function all(){
        return runSequence(
            '_unitTestsApp',
            '_unitTestsClient',
            '_unitTestsGulp',
            '_unitTestsWorkers'
        );
    };
    
    gulp.task('_unitTestsAll', tests.all);

    // this runs the unit tests for the main app
    tests.app = function app(){
        return taskRunner(paths.appTests);
    };
    
    gulp.task('_unitTestsApp', tests.app);
    
    // this runs the unit tests for the client
    tests.client = function client(){
        return taskRunner(paths.clientTests);
    };
    
    gulp.task('_unitTestsClient', tests.client);
    
    // this runs the unit tests for gulp
    tests.gulp = function gulp(){
        return taskRunner(paths.gulpTests);
    };
    
    gulp.task('_unitTestsGulp', tests.gulp);
    
    // this runs the unit tests for the workers
    tests.workers = function workers(){
        return taskRunner(paths.workersTests);
    };
    
    gulp.task('_unitTestsWorkers', tests.workers);
    
    // return our object in case it needs to be reused
    return tests;
};

// return our generator so it can be passed in the needed dependencies
module.exports = generator;