'use strict';

// include the gulp task runner
var gulp = require('gulp');

// include runSequence so tasks can be run sequentially
var runSequence = require('run-sequence');

// include the needed libraries for growl notifications
var growlerApp = require('./gulp_config/growlerApp');
var reporterFunction = require('./gulp_config/reporterFunction')(growlerApp);

// setup our default error handler
var errorHandler = require('./gulp_config/errorHandler')(reporterFunction);

// setup a notification handler to avoid repitition
var notifyHandler = require('./gulp_config/notifyHandler')(reporterFunction);
//var gulpOpen = require('gulp-open');

// get the desired build if any (only used in build and deploy)
var args = require('yargs').string('type').default({type: 'dev'}).argv;
var type = args.type;

// regular expression to ensure forced build names are consistent with semver notation
var semverPattern = /^(\d+\.\d+\.\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
var typePasses = type.match(semverPattern);

// make sure the build type is valid
if(type !== 'dev' && type !== 'patch' && type !== 'alpha' && type !== 'beta' && type !== 'prod' && !typePasses){
    throw new Error('that is not a valid build');
}

// assign this to gulp so we have access to it in our build/deploy tasks as needed
gulp.type = type;

// the default task when no task is specified, it just passes control to dev
gulp.task('default', function defaultTask(){
    gulp.start('dev');
});

// the task that should be run for developers
gulp.task('dev', function dev(){
    notifyHandler('Starting Development Environment', 'Please be patient we\'ll have you up and running in no time');
    
    runSequence(
        'build',
        'watchFiles',
        function devSetupNotifer(){
            notifyHandler('Development Environment Running', 'We\'ll keep an eye on things so sit back, relax, and do what you do');
        }
    );
});

// the task that will run all of the base tests
gulp.task('test', function test(){
    notifyHandler('Running Tests', 'We\'re running the tests to make sure nothing broke please bear with us');
    
    runSequence(
        'jsHintAll',
        'jsHintOpen',
        function testFinishedNotifier(){
            notifyHandler('Tests Finished Running', 'The tests have completed successfully');
        }
    );
});

// the task to build the application from its sources
gulp.task('build', function build(){
    notifyHandler('Building Application Files', 'We\'re building the application files please bear with us');
    
    runSequence(
        'test',
        'changeLog',
        function buildCompletedNotifier(){
            notifyHandler('Build Complete', 'The application is now built and ready to be run');
        }
    );
});

// the task to deploy the codebase to staging/production
gulp.task('deploy', function deploy(){
    notifyHandler('Preparing for Deployment', 'The deploy process is starting, please bear with us');
    
    runSequence(
        'build',
        function deployCompletedNotifier(){
            notifyHandler('Deployment Complete', 'We have finished deploying the build');
        }
    );
});

// this task is used by the development task to handle tasks when files change
gulp.task('watchFiles', function(){
    notifyHandler('Watcher Start', 'Gulp is watching your files for changes so you can ignore most of the background noise');
    
    runSequence(
        'jsHintWatchAll'
    );
});

// require jshint tasks
require('./gulp_config/jsHint')(gulp, errorHandler);

// require jshint watcher tasks
require('./gulp_config/jsHintWatch')(gulp, errorHandler);

// require the changelog task
require('./gulp_config/changeLog')(gulp, errorHandler);