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
        'lessLint',
        function testFinishedNotifier(){
            notifyHandler('Tests Finished Running', 'The tests have completed successfully');
        }
    );
});

// the task to build the application from its sources
gulp.task('build', function build(){
    notifyHandler('Building Application Files', 'We\'re building the application files please bear with us');
    
    runSequence(
        'cleanBuild',
        'test',
        'lessCompile',
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

// require jshint watcher tasks
require('./gulp_config/jsHintWatch')(gulp, errorHandler);

// require the changelog task
require('./gulp_config/changeLog')(gulp, errorHandler);

// require the cleaning tasks for file clean-up
require('./gulp_config/clean.js')(gulp, errorHandler);

// require the less tasks
require('./gulp_config/less')(gulp, errorHandler);

// require the css tasks
require('./gulp_config/css')(gulp, errorHandler);