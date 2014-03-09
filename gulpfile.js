'use strict';

var fs = require('fs');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
//var map = require('map-stream');
var stylish = require('jshint-stylish');
var notify = require('gulp-notify');
var growler = require('growler');
var combine = require('stream-combiner');

//var gulp_grunt = require('gulp-grunt');
//var tasks = gulp_grunt.tasks();

//console.log(tasks);

var paths = {
	'scripts': ['*.js', 'app/**/*.js', 'client/**/*.js', 'workers/**/*.js', 'tests/**/*.js']
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

gulp.task('default', ['test']);

gulp.task('test', ['lint']);

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