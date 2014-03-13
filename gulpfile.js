'use strict';

// this is the main task runner
var gulp = require('gulp');

// include runSequence so tasks can be run sequentially
var runSequence = require('run-sequence');

// this is used to output information about the current tasks similar to gulp -T but with organization
var help = require('gulp-task-listing');

// here we register the help command with gulp so we can run it using gulp help
gulp.task('help', help);

// include the needed libraries for growl notifications
var growlerApp = require('./gulp_config/growlerApp');

// include a shorthand reporter function to make things easy on us
var reporterFunction = require('./gulp_config/reporterFunction')(growlerApp);

// setup our default error handler
var errorHandler = require('./gulp_config/errorHandler')(reporterFunction, true);

// setup our watch error handler that won't die on errors
//var watchErrorHandler = require('./gulp_config/errorHandler')(reporterFunction, false);

// setup a notification handler to avoid repitition
//var notifyHandler = require('./gulp_config/notifyHandler')(reporterFunction);

// get the type of build
require('./gulp_config/buildType')(gulp);

// this is just a pass through to the dev task so we don't have to pass in an argument
gulp.task('default', function defaultHandler(){
    gulp.start('dev');
});

// this is the development environment task
gulp.task('dev', function dev(){
    
});

// this task is run to test the application
gulp.task('test', function test(){
    return runSequence(
        '_cleanTests',
        '_jsHintAll',
        '_jsHintOpen',
        '_unitTestsAll'
    );
});

// this task is run to build the application
gulp.task('build', function build(){
    return runSequence(
        'test'
    );
});

// this task is run to deploy the application
gulp.task('deploy', function deploy(){
    return runSequence(
        'build'
    );
});

// include our cleaning tasks here
require('./gulp_config/clean')(gulp, errorHandler);

// include our jsHint tasks here
require('./gulp_config/jsHint')(gulp, errorHandler);

// include our unit test tasks here
require('./gulp_config/unitTests')(gulp, errorHandler);