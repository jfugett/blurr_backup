// the task that should be run for developers
gulp.task('dev', function dev(){
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
    runSequence(
        'lessLint',
    );
});

// the task to build the application from its sources
gulp.task('build', function build(){
    
    runSequence(
        'cleanBuild',
        'lessCompile',
        'changeLog',
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