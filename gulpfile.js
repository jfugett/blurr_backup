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
var todos = require('gulp-todo');
var changelog = require('gulp-conventional-changelog');

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

var errorHandler = function errorHandler(error){
    console.log(error.message);

    var options = {
        title: 'UH OH!',
        message: 'Error' + error.message
    };
    
    reporterFunction(options, function(){
        return true;
    });
};

var growlerNotification = notify.withReporter(reporterFunction);

gulp.task('default', ['watchLint', 'line-count']);

gulp.task('test', ['lint', 'line-count']);

gulp.task('build', ['test', 'bumpVersion', 'generateTodos', 'generateChangeLog']);

gulp.task('deploy', ['build']);

gulp.task('line-count', function(){
    var combined = combine(
        gulp.src(paths.allFiles),
        sloc({
            tolerant: true,
            reportType: 'json',
            reportFile: 'lineCount.json'
        }),
        sloc({
            tolerant: true
        })
    );
    
    combined.on('error', errorHandler);

    return combined;
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

	combined.on('error', errorHandler);
	
	return combined;
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
            
            combinedTwo.on('error', errorHandler);
        })
    );
    
    combined.on('error', errorHandler);
    
    return combined;
});

gulp.task('watchTodos', function(){
    // @todo: Implement
});

gulp.task('watchChangeLog', function(){
    // @todo: Implement
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
    
    combined.on('error', errorHandler);
    
    return combined;
});

// @todo: Break generate Todos into separate reports for each major code section
gulp.task('generateTodos', ['bumpVersion'], function(){
    var combined = combine(
        gulp.src(paths.scripts),
        todos({
            newLine: '\n',
            fileName: 'todo.md'
        }),
        gulp.dest('./')
    );
    
    combined.on('error', errorHandler);
    
    return combined;
});

gulp.task('generateChangeLog', ['bumpVersion'], function(){
    var version = require('./package.json').version;
    
    var combined = combine(
        gulp.src(['package.json', 'changelog.md']),
        changelog({
            version: version,
            file: 'changelog.md',
            repository: 'https://github.com/jfugett/blurr'
        }),
        gulp.dest('./')
    );
    
    combined.on('error', errorHandler);
    
    return combined;
});