'use strict';

//var gdebug = require('gulp-debug');
var combine = require('stream-combiner');

// include our code coverage tool
var cover = require('gulp-coverage');

// include our testing framework
var mocha = require('gulp-mocha');

// can't use jasmine for now since it won't fail the build
// @todo Fork gulp-jasmine, fix exit code option, and submit a pull request
//var jasmine = require('gulp-jasmine');
// include our application paths
var paths = require('./paths');

// include run-sequence for order management
var runSequence = require('run-sequence');

// include our browser opener task
var browserOpener = require('gulp-open');

// this is a wrapper so that the needed dependencies can be passed in
var generator = function generator(gulp, errorHandler){

    // include our cleaner library so that we can clean the coverage directories
    // we include it here as it needs access to gulp and the errorHandler
    var cleaner = require('./clean')(gulp, errorHandler);

    // this is our mocha unit test task runner
    var taskRunner = function(code, tests, dest){
        // here we make sure that we clean the coverage results
        cleaner.cleanPath(dest + 'coverage.html');
        
        // @todo Re-enable the enforcement
//        var enforcementOptions = {
//            statements: 100,
//            blocks: 100,
//            lines: 100
//        };
        
        var combined = combine(
            gulp.src(tests),
            cover.instrument({
                pattern: code,
                debugDirectory: 'coverage'
            }),
            mocha({
                ui: 'bdd',
                bail: true,
                reporter: 'spec'
            }),
            cover.gather(),
            cover.format({
                reporter: 'html',
            }),
            gulp.dest(dest).on('end', function(){
                gulp.src(dest + 'coverage.html', false)
                    .pipe(browserOpener(dest + 'coverage.html', {app: 'chrome'}));
            })
//            cover.enforce(enforcementOptions),
        );
        
        combined.on('error', errorHandler);
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
        taskRunner(paths.app, paths.appTests, paths.appCoverage);
    };
    
    gulp.task('_unitTestsApp', tests.app);
    
    // this runs the unit tests for the client
    tests.client = function client(){
        taskRunner(paths.client, paths.clientTests, paths.clientCoverage);
    };
    
    gulp.task('_unitTestsClient', tests.client);
    
    // this runs the unit tests for gulp
    tests.gulp = function gulp(){
        taskRunner(paths.gulp, paths.gulpTests, paths.gulpCoverage);
    };
    
    gulp.task('_unitTestsGulp', tests.gulp);
    
    // this runs the unit tests for the workers
    tests.workers = function workers(){
        taskRunner(paths.workers, paths.workersTests, paths.workersCoverage);
    };
    
    gulp.task('_unitTestsWorkers', tests.workers);
    
    // return our object in case it needs to be reused
    return tests;
};

// return our generator so it can be passed in the needed dependencies
module.exports = generator;