'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
//var map = require('map-stream');
var stylish = require('jshint-stylish');
//var notify = require('gulp-notify');

var paths = {
	'scripts': ['*.js', 'app/**/*.js', 'client/**/*.js', 'workers/**/*.js', 'tests/**/*.js']
};

gulp.task('default', ['test']);

gulp.task('test', ['lint']);

gulp.task('lint', function(){
	gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
/*		.pipe(map(function (file, cb) {

			if(!file.jshint.success){
				cb('JSHint Failed', file);
				return;
			}

			cb(null, file);
		}))
		.on('error', function(err){
			console.log(err);
		})
		.on('error', notify.onError('Error: <%= error %>'));*/
});