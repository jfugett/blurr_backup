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
    };

    // shortcut method that will run all of the jsHint tasks
    jsHint.all = function all(){
        // these run in parallel, that's the reason for the array notation
        runSequence([
            'jsHintGulp',
            'jsHintApp',
            'jsHintClient',
            'jsHintWorker',
            'jsHintAPITests',
            'jsHintAPPTests',
            'jsHintClientTests',
            'jsHintCPUTests',
            'jsHintE2ETests',
            'jsHintLoadTests',
            'jsHintMemoryTests',
            'jsHintPerformanceTests',
            'jsHintWorkerTests'
        ]);
    };
    
    // assigns the task to gulp
    gulp.task('jsHintAll', jsHint.all);
    
    // handles the gulpfile and configs
    jsHint.gulp = function gulp(){
        jsHintFileRunner(paths.gulpScripts);
    };
    
    gulp.task('jsHintGulp', jsHint.gulp);
    
    // handles the application files
    jsHint.app = function gulp(){
        jsHintFileRunner(paths.appScripts);
    };
    
    gulp.task('jsHintApp', jsHint.app);
    
    // handles the client scripts
    jsHint.client = function client(){
        jsHintFileRunner(paths.clientScripts);
    };
    
    gulp.task('jsHintClient', jsHint.client);
    
    // handles any worker scripts
    jsHint.worker = function worker(){
        jsHintFileRunner(paths.workerScripts);
    };
    
    gulp.task('jsHintWorker', jsHint.worker);
    
    // handles the api test cases
    jsHint.apiTests = function apiTests(){
        jsHintFileRunner(paths.apiTests);
    };
    
    gulp.task('jsHintAPITests', jsHint.apiTests);
    
    // handles the application test cases
    jsHint.appTests = function appTests(){
        jsHintFileRunner(paths.appTests);
    };
    
    gulp.task('jsHintAPPTests', jsHint.appTests);
    
    // handles the client test cases
    jsHint.clientTests = function clientTests(){
        jsHintFileRunner(paths.clientTests);
    };
    
    gulp.task('jsHintClientTests', jsHint.clientTests);
    
    // handles the cpu tests
    jsHint.cpuTests = function cpuTests(){
        jsHintFileRunner(paths.cpuTests);
    };
    
    gulp.task('jsHintCPUTests', jsHint.cpuTests);
    
    // handles the end to end tests
    jsHint.e2eTests = function e2eTests(){
        jsHintFileRunner(paths.e2eTests);
    };
    
    gulp.task('jsHintE2ETests', jsHint.e2eTests);
    
    // handles the load tests
    jsHint.loadTests = function loadTests(){
        jsHintFileRunner(paths.loadTests);
    };
    
    gulp.task('jsHintLoadTests', jsHint.loadTests);
    
    // handles the memory tests
    jsHint.memoryTests = function memoryTests(){
        jsHintFileRunner(paths.memoryTests);
    };
    
    gulp.task('jsHintMemoryTests', jsHint.memoryTests);
    
    // handles the performance tests
    jsHint.performanceTests = function performanceTests(){
        jsHintFileRunner(paths.performanceTests);
    };
    
    gulp.task('jsHintPerformanceTests', jsHint.performanceTests);
    
    // handles the worker tests
    jsHint.workerTests = function workerTests(){
        jsHintFileRunner(paths.workerTests);
    };
    
    gulp.task('jsHintWorkerTests', jsHint.workerTests);
    
    // this task opens the jshint.html file in the browser
    jsHint.open = function jsHintOpen(){
        gulp.src(reporter.outputFile)
            .pipe(browserOpen('<%file.path%>', {app: 'chrome'}));
    };
    
    gulp.task('jsHintOpen', jsHint.open);
    
    // return the object in case we need to reuse it later or call any of the methods from another file
    return jsHint;
};

// export our generator function so we can take in our dependencies
module.exports = generator;