'use strict';

var gulpExec = require('gulp-exec');
var combine = require('stream-combiner');

var generator = function generator(gulp, errorHandler){

    var generateChangeLog = function generateChangeLog(){
        var packageJson = require('../package.json');
        
        var combined = combine(
            gulp.src('package.json'),
            gulpExec('lorax ' + packageJson.version + ' CHANGELOG.md')
        );
        
        combined.on('error', errorHandler)
    };

    return generateChangeLog;
};

module.exports = generator;