'use strict';

var fs = require('fs');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var stylish = require('jshint-stylish');
var growler = require('growler');
var combine = require('stream-combiner');
var notify = require('gulp-notify');
var sloc = require('gulp-sloc');

var paths = {
	'scripts': ['*.js', 'app/**/*.js', 'client/**/*.js', 'workers/**/*.js', 'tests/**/*.js'],
	'allFiles': [
        '*.js',
        '*.json',
        'app/**/*.js',
        'client/**/*.js',
        'workers/**/*.js',
        'tests/**/*.js'
    ]
};

var growlerApp = new growler.GrowlApplication('blurr', {
	icon: fs.readFileSync('gulp.png')
});

growlerApp.setNotifications({
	Blurr: {}
});

var growlerNotification = notify.withReporter(function(notificationOptions, callback){
	growlerApp.register(function(success, err){
		if(!success || err){
			return callback(null, success);
		}

		// Rename 'message' property to 'text'
		notificationOptions.text = notificationOptions.message;
		delete notificationOptions.message;

		growlerApp.sendNotification('Blurr', notificationOptions, function(success, err) {
			return callback(err, success);
		});
	});
});

gulp.task('default', ['watchLint', 'line-count']);

gulp.task('test', ['lint', 'line-count']);

gulp.task('line-count', function(){
    gulp.src(paths.allFiles)
        .pipe(sloc({
            tolerant: true,
            reportType: 'json',
            reportFile: 'lineCount.json',
        }))
        .pipe(gulp.dest('./test_results/'));
    gulp.src(paths.allFiles)
        .pipe(sloc({
            tolerant: true,
        }));
});

gulp.task('lint', function(){
	var combined = combine(
		gulp.src(paths.scripts),
		jshint(),
		jshint.reporter(stylish),
		jshint.reporter('fail'),
		growlerNotification({
			onLast: true,
			title: 'JSHint Finished',
			message: 'JSHint has finished linting your files'
		})
	);

	combined.on('error', function(error){
		console.log(error);
		growlerNotification.onError('Error: <%= error.message %>');
	});
});

gulp.task('watchLint', function(){
    var combined = combine(
        gulp.src(paths.scripts),
        watch(function(files){
            var combined_two = combine(
                files,
                jshint(),
                jshint.reporter(stylish),
                jshint.reporter('fail'),
                growlerNotification({
                    onLast: true,
                    title: 'JSHint Finished',
                    message: 'JSHint has finished linting your files'
                })
            );
            
            combined_two.on('error', function(error){
                console.log(error);
                growlerNotification.onError('Error: <%= error.message %>');
            });
            
            return combined_two;
        })
    );
    
    combined.on('error', function(error){
        console.log(error);
        growlerNotification.onError('Error: <%= error.message %>');
    });
});