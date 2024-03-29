'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var growlerApp = require('./gulp_config/growlerApp');
var reporterFunction = require('./gulp_config/reporterFunction')(growlerApp);
var errorHandler = require('./gulp_config/errorHandler')(reporterFunction);
var notifyHandler = require('./gulp_config/notifyHandler')(reporterFunction);
var growlerNotification = notify.withReporter(reporterFunction);
var gulpOpen = require('gulp-open');
var args = require('yargs').default({type: 'dev'}).argv;

gulp.task('default', function(){
    notifyHandler('Gulp Started', 'Sit back, relax, and let us handle it for you :)');
    
    // @todo code complexity, lines of code, generate todos, generate changelog
    runSequence(
        'watchTest',
        'watchBuild',
        function(){
            console.log(args);
        }
    );
});

gulp.task('test', function(){
    notifyHandler('Started Running Tests', 'We\'re now running the tests for the application');
    
    runSequence(
        'jsHint',
        'lineCounter',
        'complexityReport',
        function(){
            notifyHandler('Finished Running Tests', 'The tests have now completed running');
        }
    );
});

gulp.task('build', function(){
    notifyHandler('Starting Build', 'We\'re now building the application');
    
    runSequence(
        'test',
        'bumpVersion',
        'generateTodos',
        'generateChangeLog',
        function(){
            notifyHandler('Finished Building Application', 'The application has finished building');
        }
    );
});

gulp.task('deploy', function(){
    notifyHandler('Starting Deploy Process', 'We\'re starting the deployment process for you now');
    
    runSequence(
        'build',
        function(){
            notifyHandler('Finished Deploying', 'The application has finished being deployed');
        }
    );
});

var jsHint = require('./gulp_config/jsHint')(gulp, errorHandler, growlerNotification);
gulp.task('jsHint', jsHint);

var lineCounter = require('./gulp_config/lineCounter')(gulp, errorHandler);
gulp.task('lineCounter', lineCounter.lineCounter);
gulp.task('lineCounterConsole', lineCounter.lineCounterConsole);
gulp.task('lineCounterFile', lineCounter.lineCounterFile);

var bumpVersion = require('./gulp_config/bumpVersion')(gulp, errorHandler, notifyHandler);
gulp.task('bumpVersion', bumpVersion);

var generateTodos = require('./gulp_config/generateTodos')(gulp, errorHandler);
gulp.task('generateTodos', generateTodos);

var generateChangeLog = require('./gulp_config/generateChangeLog')(gulp, errorHandler);
gulp.task('generateChangeLog', generateChangeLog);

var watchJsHint = require('./gulp_config/watchJsHint')(gulp, errorHandler, growlerNotification);
gulp.task('watchJsHint', watchJsHint);

var generateComplexityReport = require('./gulp_config/plato')(gulp, errorHandler);
gulp.task('generateComplexityReport', generateComplexityReport);

gulp.task('openComplexityReport', function openComplexityReport(){
    return gulp.src('./test_results/complexity_report/index.html')
        .pipe(gulpOpen('file://<%= file.path %>',{app:'chrome'}));
});

gulp.task('complexityReport', function complexityReport(){
    runSequence(
        'generateComplexityReport',
        'openComplexityReport'
    );
});

/*
* @todo
*
* code coverage - default, test
* code coverage enforcement - default, test
* unit testing for node - default, test
* unit testing for front-end - default, test
* integration testing - test
* api testing - test
* performance testing - test
* load testng - test
* cpu testing - test
* memory testing - test
* worker testing - test
* e2e testing - test
* less compilation - default, build
* js minification - build
* css minification - build
* image minification - build
* html minification - build
* auto reload of browser - default
* auto reload of server - default
* Integrated Browser testing (sauce labs) - test
* CDN support - build/deploy (not sure which)
* Browserify on shared files - default, build
* cache busting - default, build
* angular template precompilation and concatenation - default, build
* ngmin - build/deploy (not sure which)
* phantom, casper, slimer, and zombie.js support - test
* css concatenation - default, build
* js concatenation - default, build
* json strip comments - build
* code documentation generator - default, build
* static site generation - for SEO - deploy
* !18n file pre-compilation - default, build
* !18n caching - build/deploy (may be better to make this one happen through the CDN)
* Automatic setup/installation script - deploy
* Automated release tool - deploy
*/