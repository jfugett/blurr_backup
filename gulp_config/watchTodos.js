'use strict';

var combine = require('stream-combiner');
var paths = require('./paths');
var watch = require('gulp-watch');

var generator = function generator(gulp, errorHandler){
    var watchTodos = function watchTodos(){
        var combined = combine(
            gulp.src(paths.scripts),
            watch(function todosWatcher(){
                gulp.start('generateTodos');
            })
        );
        
        combined.on('error', errorHandler);
    };
    
    return watchTodos;
};

module.exports = generator;