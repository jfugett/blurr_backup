'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var todos = require('gulp-todo');

var generator = function generator(gulp, errorHandler){

    var generateTodos = function generateTodos(){
        var combined = combine(
            gulp.src(paths.scripts),
            todos({
                newLine: '\n',
                fileName: 'TODO.md'
            }),
            gulp.dest('./')
        );
        
        combined.on('error', errorHandler);
        
        return combined;
    };
    
    return generateTodos;
};

module.exports = generator;