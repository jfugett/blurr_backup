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
var prompter = require('gulp-prompt');
var mversion = require('gulp-mversion');
var map = require('map-stream');

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

var reporterFunction = function reporterFunction(notificationOptions, callback){
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
};

var growlerNotification = notify.withReporter(reporterFunction);

gulp.task('default', ['watchLint', 'line-count']);

gulp.task('test', ['lint', 'line-count']);

gulp.task('build', ['test']);

gulp.task('deploy', ['build', 'bumpVersion']);

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
        console.log(error.message);
        var options = {
            title: 'UH OH!',
            message: 'Error' + error.message
        };
        
        reporterFunction(options, function(){return true;});
    });
});

gulp.task('watchLint', function(){
    var combined = combine(
        gulp.src(paths.scripts),
        watch(function(files){
            var combinedTwo = combine(
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
            
            combinedTwo.on('error', function(error){
                console.log(error.message);
                var options = {
                    title: 'UH OH!',
                    message: 'Error' + error.message
                };
                
                reporterFunction(options, function(){return true;});
            });
            
//            return combinedTwo;
        })
    );
    
    combined.on('error', function(error){
        console.log(error.message);
        var options = {
            title: 'UH OH!',
            message: 'Error' + error.message
        };
        
        reporterFunction(options, function(){return true;});
    });
});

gulp.task('bumpVersion', function(){
    var combined = combine(
        gulp.src(['*.js']),
        growlerNotification({
            title: 'Your Input is Needed',
            message: 'We need you\'re input on what type of build this is'
        }),
        prompter.prompt({
            type: 'list',
            name: 'bump',
            message: 'What type of build is this?',
            choices: ['dev', 'patch', 'minor', 'major', 'alpha', 'beta', 'prod']
        }, function(res){
            if(res.bump === 'dev'){
                return true;
            }
            if(res.bump === 'alpha' || res.bump === 'beta' || res.bump === 'prod'){
                var packageJson = require('./package.json');
                var version = packageJson.version.split('-');
                
                res.bump = version[0] + '-' + res.bump;
            }
            gulp.src(['package.json'])
            .pipe(mversion(res.bump))
            .pipe(gulp.dest('./'));
        }),
        jshint()
    );
    
    combined.on('error', function(error){
        console.log(error.message);
        var options = {
            title: 'UH OH!',
            message: 'Error' + error.message
        };
        
        reporterFunction(options, function(){return true;});
    });
});