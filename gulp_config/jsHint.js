'use strict';

// include our custom reporter so we can output the results to a file
var reporter = require('./jsHintReporter');

// include runSequence so tasks can be run sequentially
var runSequence = require('run-sequence');

// include stream combiner so we can control stream dependencies and errors better
var combine = require('stream-combiner');

// include our application paths
var paths = require('./paths.js');

// include the jshint library
var jshint = require('gulp-jshint');

// include the styling for jshint
var stylish = require('jshint-stylish');

// include the plugin to open the browser window to a specific location
var browserOpen = require('gulp-open');

// this is just a wrapper so the methods below all have access to the needed references
var generator = function generator(gulp, errorHandler){
    
    // define our exports variable
    var jsHint = {};
    
    // This is the function that does the actual work
    var jsHintFileRunner = function jsHintFileRunner(src){

        // combine the streams simply for error handling
        var combined = combine(
            gulp.src(src),
            jshint(),
            jshint.reporter(stylish),
            jshint.reporter(reporter),
            jshint.reporter('fail')
        );
        
        // attaches the errorHandler to the streams
        combined.on('error', errorHandler);
        
        return combined;
    };

    // shortcut method that will run all of the jsHint tasks
    jsHint.all = function all(){
        // these run in parallel, that's the reason for the array notation
        return runSequence([
            '_jsHintGulp',
            '_jsHintApp',
            '_jsHintClient',
            '_jsHintWorker',
            '_jsHintAPITests',
            '_jsHintAPPTests',
            '_jsHintClientTests',
            '_jsHintCPUTests',
            '_jsHintE2ETests',
            '_jsHintGulpTests',
            '_jsHintLoadTests',
            '_jsHintMemoryTests',
            '_jsHintPerformanceTests',
            '_jsHintWorkerTests'
        ]);
    };
    
    // assigns the task to gulp
    gulp.task('_jsHintAll', jsHint.all);
    
    // handles the gulpfile and configs
    jsHint.gulp = function gulp(){
        return jsHintFileRunner(paths.gulp);
    };
    
    gulp.task('_jsHintGulp', jsHint.gulp);
    
    // handles the application files
    jsHint.app = function gulp(){
        return jsHintFileRunner(paths.app);
    };
    
    gulp.task('_jsHintApp', jsHint.app);
    
    // handles the client scripts
    jsHint.client = function client(){
        return jsHintFileRunner(paths.client);
    };
    
    gulp.task('_jsHintClient', jsHint.client);
    
    // handles any worker scripts
    jsHint.worker = function worker(){
        return jsHintFileRunner(paths.workers);
    };
    
    gulp.task('_jsHintWorker', jsHint.worker);
    
    // handles the api test cases
    jsHint.apiTests = function apiTests(){
        return jsHintFileRunner(paths.apiTests);
    };
    
    gulp.task('_jsHintAPITests', jsHint.apiTests);
    
    // handles the application test cases
    jsHint.appTests = function appTests(){
        return jsHintFileRunner(paths.appTests);
    };
    
    gulp.task('_jsHintAPPTests', jsHint.appTests);
    
    // handles the client test cases
    jsHint.clientTests = function clientTests(){
        return jsHintFileRunner(paths.clientTests);
    };
    
    gulp.task('_jsHintClientTests', jsHint.clientTests);
    
    // handles the cpu tests
    jsHint.cpuTests = function cpuTests(){
        return jsHintFileRunner(paths.cpuTests);
    };
    
    gulp.task('_jsHintCPUTests', jsHint.cpuTests);
    
    // handles the end to end tests
    jsHint.e2eTests = function e2eTests(){
        return jsHintFileRunner(paths.e2eTests);
    };
    
    gulp.task('_jsHintE2ETests', jsHint.e2eTests);
    
    // handles the gulp tests
    jsHint.gulpTests = function gulpTests(){
        return jsHintFileRunner(paths.gulpTests);
    };
    
    gulp.task('_jsHintGulpTests', jsHint.gulpTests);
    
    // handles the load tests
    jsHint.loadTests = function loadTests(){
        return jsHintFileRunner(paths.loadTests);
    };
    
    gulp.task('_jsHintLoadTests', jsHint.loadTests);
    
    // handles the memory tests
    jsHint.memoryTests = function memoryTests(){
        return jsHintFileRunner(paths.memoryTests);
    };
    
    gulp.task('_jsHintMemoryTests', jsHint.memoryTests);
    
    // handles the performance tests
    jsHint.performanceTests = function performanceTests(){
        return jsHintFileRunner(paths.performanceTests);
    };
    
    gulp.task('_jsHintPerformanceTests', jsHint.performanceTests);
    
    // handles the worker tests
    jsHint.workerTests = function workerTests(){
        return jsHintFileRunner(paths.workersTests);
    };
    
    gulp.task('_jsHintWorkerTests', jsHint.workerTests);

    // this task opens the jshint.html file in the browser
    jsHint.open = function jsHintOpen(){
        return gulp.src(reporter.outputFile)
            .pipe(browserOpen('<%= file.path %>', {app: 'chrome'}));
    };
    
    gulp.task('_jsHintOpen', jsHint.open);
    
    // return the object in case we need to reuse it later or call any of the methods from another file
    return jsHint;
};

// export our generator function so we can take in our dependencies
module.exports = generator;