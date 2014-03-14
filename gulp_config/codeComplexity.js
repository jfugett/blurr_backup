'use strict';

// include our code complexity report generator
var plato = require('gulp-plato');

// include our paths
var paths = require('./paths');

// include stream-combiner for better stream handlng
var combine = require('stream-combiner');

// include the file system module so we can read our .jshintrc file
var fs = require('fs');

// include run-sequence for sequencing of the streams
var runSequence = require('run-sequence');

// include our browser opening utility
var browserOpener = require('gulp-open');

// here we grab our jshintrc file so that the configuration matches what we use in jshint
var jsHintrc = JSON.parse(fs.readFileSync('.jshintrc', 'utf8'));

// here we define our generator so that needed dependencies can be injected
var generator = function generator(gulp, errorHandler){
    // define our primary object here
    var complexityReport = {};
    
    // this function handles the dirty work so we don't have to keep track of a hundred copies of this
    var taskRunner = function taskRunner(src, dest){

        var combined = combine(
            gulp.src(src),
            plato(dest, {
                jshint: {
                    options: jsHintrc,
                    globals: jsHintrc.globals
                },
                complexity: {
                    format: 'markdown',
                    newmi: true
                }
            }).on('end', function(){
                gulp.src(dest + 'index.html')
                    .pipe(browserOpener(dest + 'index.html', {app: 'chrome'}));
            })
        );
        
        combined.on('error', errorHandler);
        
        return combined;
    };
    
    // this is a shortcut method that allows us to run all of the complexity reports
    complexityReport.all = function all(){
        return runSequence(
            '_complexityReportApp',
            '_complexityReportClient',
            '_complexityReportGulp',
            '_complexityReportWorkers',
            '_complexityReportApiTests',
            '_complexityReportAppTests',
            '_complexityReportClientTests',
            '_complexityReportCpuTests',
            '_complexityReportE2eTests',
            '_complexityReportGulpTests',
            '_complexityReportLoadTests',
            '_complexityReportMemoryTests',
            '_complexityReportPerformanceTests',
            '_complexityReportWorkersTests'
        );
    };
    gulp.task('_complexityReportAll', complexityReport.all);
    
    // this runs the complexity report on our application files
    complexityReport.app = function app(){
        return taskRunner(paths.app, paths.appComplexityReport);
    };
    
    gulp.task('_complexityReportApp', complexityReport.app);

    // this runs the complexity report on our client files    
    complexityReport.client = function client(){
        return taskRunner(paths.client, paths.clientComplexityReport);
    };
    
    gulp.task('_complexityReportClient', complexityReport.client);
    
    // this runs the complexity report on our gulp fiels
    complexityReport.gulp = function gulp(){
        return taskRunner(paths.gulp, paths.gulpComplexityReport);
    };
    
    gulp.task('_complexityReportGulp', complexityReport.gulp);
    
    // this runs the complexity report on our workers files
    complexityReport.workers = function workers(){
        return taskRunner(paths.workers, paths.workersComplexityReport);
    };
    
    gulp.task('_complexityReportWorkers', complexityReport.workers);
    
    // this runs the complexity report on our api tests
    complexityReport.apiTests = function apiTests(){
        return taskRunner(paths.apiTests, paths.apiTestsComplexityReport);
    };
    
    gulp.task('_complexityReportApiTests', complexityReport.apiTests);
    
    // this runs the complexity report on our app tests
    complexityReport.appTests = function appTests(){
        return taskRunner(paths.appTests, paths.appTestsComplexityReport);
    };
    
    gulp.task('_complexityReportAppTests', complexityReport.appTests);
    
    // this runs the complexity report for our client tests
    complexityReport.clientTests = function clientTests(){
        return taskRunner(paths.clientTests, paths.clientTestsComplexityReport);
    };
    
    gulp.task('_complexityReportClientTests', complexityReport.clientTests);
    
    // this runs the complexity report for our cpu tests
    complexityReport.cpuTests = function cpuTests(){
        return taskRunner(paths.cpuTests, paths.cpuTestsComplexityReport);
    };
    
    gulp.task('_complexityReportCpuTests', complexityReport.cpuTests);
    
    // this runs the complexity report for our E2E tests
    complexityReport.e2eTests = function e2eTests(){
        return taskRunner(paths.e2eTests, paths.e2eTestsComplexityReport);
    };
    
    gulp.task('_complexityReportE2eTests', complexityReport.e2eTests);
    
    // this runs the complexity report four our gulp tests
    complexityReport.gulpTests = function gulpTests(){
        return taskRunner(paths.gulpTests, paths.gulpTestsComplexityReport);
    };
    
    gulp.task('_complexityReportGulpTests', complexityReport.gulpTests);
    
    // this runs the complexity report for our load tests
    complexityReport.loadTests = function loadTests(){
        return taskRunner(paths.loadTests, paths.loadTestsComplexityReport);
    };
    
    gulp.task('_complexityReportLoadTests', complexityReport.loadTests);
    
    // this runs the complexity report for our memory tests
    complexityReport.memoryTests = function memoryTests(){
        return taskRunner(paths.memoryTests, paths.memoryTestsComplexityReport);
    };
    
    gulp.task('_complexityReportMemoryTests', complexityReport.memoryTests);
    
    // this runs the complexity report for our performance tests
    complexityReport.performanceTests = function performanceTests(){
        return taskRunner(paths.performanceTests, paths.performanceTestsComplexityReport);
    };
    
    gulp.task('_complexityReportPerformanceTests', complexityReport.performanceTests);
    
    // this runs the complexity report for our workers tests
    complexityReport.workersTests = function workersTests(){
        return taskRunner(paths.workersTests, paths.workersTestsComplexityReport);
    };
    
    gulp.task('_complexityReportWorkersTests', complexityReport.workersTests);
    
    // return our main object here so it can be reused if needed
    return complexityReport;
};

module.exports = generator;