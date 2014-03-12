'use strict';

// include stream combiner so we can control stream dependencies and errors better
var combine = require('stream-combiner');

// include runSequence so tasks can be run sequentially
var runSequence = require('run-sequence');

// include our application paths
var paths = require('./paths.js');

// include the jshint library
var jshint = require('gulp-jshint');

// include the styling for jshint
var stylish = require('jshint-stylish');

// include the file watcher so we can listen for file changes
var watch = require('gulp-watch');

// this is just a wrapper so that the global gulp and error handler can be passed in
var generator = function generator(gulp, errorHandler){

    // define our exports variable
    var jsHintWatch = {};
    
    // This is the function that does the actual work
    var jsHintFileRunner = function jsHintFileRunner(src){

        var wrapper = combine(
            watch({glob: src}, function jsHintWatcher(files){
                var combined = combine(
                    files,
                    jshint(),
                    jshint.reporter(stylish),
                    jshint.reporter('fail')
                );
                
                combined.on('error', errorHandler);
            })
        );
        
        wrapper.on('error', errorHandler);
    };
    
    // shortcut method that will run all of the jsHint tasks
    jsHintWatch.all = function all(){
        // these run in parallel, that's the reason for the array notation
        runSequence([
            'jsHintWatchGulp',
            'jsHintWatchApp',
            'jsHintWatchClient',
            'jsHintWatchWorker',
            'jsHintWatchAPITests',
            'jsHintWatchAPPTests',
            'jsHintWatchClientTests',
            'jsHintWatchCPUTests',
            'jsHintWatchE2ETests',
            'jsHintWatchLoadTests',
            'jsHintWatchMemoryTests',
            'jsHintWatchPerformanceTests',
            'jsHintWatchWorkerTests'
        ]);
    };
    
    // assigns the task to gulp
    gulp.task('jsHintWatchAll', jsHintWatch.all);
    
    // handles the gulpfile and configs
    jsHintWatch.gulp = function gulp(){
        jsHintFileRunner(paths.gulpScripts);
    };
    
    gulp.task('jsHintWatchGulp', jsHintWatch.gulp);
    
    // handles the application files
    jsHintWatch.app = function gulp(){
        jsHintFileRunner(paths.appScripts);
    };
    
    gulp.task('jsHintWatchApp', jsHintWatch.app);
    
    // handles the client scripts
    jsHintWatch.client = function client(){
        jsHintFileRunner(paths.clientScripts);
    };
    
    gulp.task('jsHintWatchClient', jsHintWatch.client);
    
    // handles any worker scripts
    jsHintWatch.worker = function worker(){
        jsHintFileRunner(paths.workerScripts);
    };
    
    gulp.task('jsHintWatchWorker', jsHintWatch.worker);
    
    // handles the api test cases
    jsHintWatch.apiTests = function apiTests(){
        jsHintFileRunner(paths.apiTests);
    };
    
    gulp.task('jsHintWatchAPITests', jsHintWatch.apiTests);
    
    // handles the application test cases
    jsHintWatch.appTests = function appTests(){
        jsHintFileRunner(paths.appTests);
    };
    
    gulp.task('jsHintWatchAPPTests', jsHintWatch.appTests);
    
    // handles the client test cases
    jsHintWatch.clientTests = function clientTests(){
        jsHintFileRunner(paths.clientTests);
    };
    
    gulp.task('jsHintWatchClientTests', jsHintWatch.clientTests);
    
    // handles the cpu tests
    jsHintWatch.cpuTests = function cpuTests(){
        jsHintFileRunner(paths.cpuTests);
    };
    
    gulp.task('jsHintWatchCPUTests', jsHintWatch.cpuTests);
    
    // handles the end to end tests
    jsHintWatch.e2eTests = function e2eTests(){
        jsHintFileRunner(paths.e2eTests);
    };
    
    gulp.task('jsHintWatchE2ETests', jsHintWatch.e2eTests);
    
    // handles the load tests
    jsHintWatch.loadTests = function loadTests(){
        jsHintFileRunner(paths.loadTests);
    };
    
    gulp.task('jsHintWatchLoadTests', jsHintWatch.loadTests);
    
    // handles the memory tests
    jsHintWatch.memoryTests = function memoryTests(){
        jsHintFileRunner(paths.memoryTests);
    };
    
    gulp.task('jsHintWatchMemoryTests', jsHintWatch.memoryTests);
    
    // handles the performance tests
    jsHintWatch.performanceTests = function performanceTests(){
        jsHintFileRunner(paths.performanceTests);
    };
    
    gulp.task('jsHintWatchPerformanceTests', jsHintWatch.performanceTests);
    
    // handles the worker tests
    jsHintWatch.workerTests = function workerTests(){
        jsHintFileRunner(paths.workerTests);
    };
    
    gulp.task('jsHintWatchWorkerTests', jsHintWatch.workerTests);
    
    return jsHintWatch;
};

module.exports = generator;