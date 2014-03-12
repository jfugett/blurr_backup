'use strict';

// include our command line runner
var gulpExec = require('gulp-exec');

// include our stream combiner library for better error handling
var combine = require('stream-combiner');

// this is just a wrapper so that the needed dependencies can be inject
var generator = function generator(gulp, errorHandler){

    // setup our exports variable
    var changeLog = {};
    
    changeLog.generate = function generate(){
        var combined = combine(
            // we use the package.json as we know it will always exist and there will only be one
            gulp.src('package.json'),
            // we run the command script that generates our changelog for us
            gulpExec('changelogger -d "changelog" -f html ./')
        );
        
        combined.on('error', errorHandler);
    };
    
    // here we register our task
    gulp.task('changeLog', changeLog.generate);
    
    // we return the object here in case it needs to be reused somewhere
    return changeLog;
};

module.exports = generator;