'use strict';

var lessc = require('gulp-less');
var paths = require('./paths');
var recess = require('gulp-recess');
var combine = require('stream-combiner');

var generator = function generator(gulp, errorHandler){
    var compiler = {};
    
    compiler.less = function less(){
        
        var combined = combine(
            gulp.src(paths.lessSource),
            lessc(),
            gulp.dest(paths.lessDestination)
        );
        
        combined.on('error', errorHandler);
    };
    
    gulp.task('lessCompile', compiler.less);
    
    compiler.lint = function lint(){
        var combined = combine(
            gulp.src(paths.lessSource),
            recess()
        );
        
        combined.on('error', errorHandler);
    };
    
    gulp.task('lessLint', compiler.lint);
    
    return compiler;
};

module.exports = generator;