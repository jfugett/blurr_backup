'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');

var generator = function generator(gulp, errorHandler){
    var watchChangeLog = function watchChangeLog(){
        var combined = combine(
            gulp.src(paths.allFiles),
            watch(function changeLogWatcher(){
                gulp.start('generateChangeLog');
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchChangeLog;
};

module.exports = generator;