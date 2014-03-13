'use strict';

var paths = require('./paths');
var combine = require('stream-combiner');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

var generator = function generator(gulp, errorHandler){
    var compiler = {};
    
    compiler.minify = function minify(){
        var combined = combine(
            gulp.src(paths.cssSource),
            minifyCSS(),
            rename({
                extname: ".min.css"
            }),
            gulp.dest(paths.cssDestination)
        );
        
        combined.on('error', errorHandler);
    };
    
    gulp.task('minifyCss', compiler.minify);
};

module.exports = generator;