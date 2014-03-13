'use strict';

var clean = require('gulp-clean');
var combine = require('stream-combiner');
var paths = require('./paths');

var generator = function generator(gulp, errorHandler){
    var cleaner = {};
    
    cleaner.build = function build(){
        var combined = combine(
            gulp.src(paths.buildPath, {read: false}),
            clean()
        );
        
        combined.on('error', errorHandler);
    };
    
    gulp.task('cleanBuild', cleaner.build);
    
    return cleaner;
};

module.exports = generator;