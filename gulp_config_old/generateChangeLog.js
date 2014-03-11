'use strict';

var gulpExec = require('gulp-exec');
var combine = require('stream-combiner');

var generator = function generator(gulp, errorHandler){

    var generateChangeLog = function generateChangeLog(){
        var combined = combine(
            gulp.src('package.json'),
            gulpExec('changelogger -d "./changelog/" -f html ./')
        );
        
        combined.on('error', errorHandler);
    };

    return generateChangeLog;
};

module.exports = generator;