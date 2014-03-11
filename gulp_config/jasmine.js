'use strict';

var jasmine = require('gulp-jasmine');
var combine = require('stream-combiner');
var coverageEnforcer = require("gulp-istanbul-enforcer");
var istanbul = require('gulp-istanbul');

var generator = function generator(gulp, errorHandler){
    var appUnitTests = function appUnitTests(){
        
        var combined = combine(
            gulp.src('app/**/*.js'),
            istanbul()
        );
        
        combined.on('error', errorHandler);
        
        var combinedTwo = combine(
            gulp.src(['tests/app/**/*.spec.js', 'app/**/*.js']),
            jasmine(),
            istanbul.writeReports(),
            gulp.dest('coverage/')
        );
        
        combinedTwo.on('error', errorHandler);
        
        var options = {
            thresholds: {
                statements: 100,
                branches: 100,
                lines: 100,
                functions: 100
            },
            coverageDirectory: 'coverage/',
            rootDirectory: '.'
        };
        
        var combinedThree = combine(
            gulp.src('.'),
            coverageEnforcer(options)
        );
        
        combinedThree.on('error', errorHandler);

/*        var combined = combine(
            gulp.src('app/server.spec.js'),
            cover.instrument({
                pattern: ['.js']
            }),
            jasmine(),
            cover.gather(),
            cover.format({
                reporter: 'html',
                outFile: 'jasmine.html'
            }),
            gulp.dest('./test_results')
        );
        
        combined.on('error', errorHandler);*/
    };
    
    var tests = {
        app: appUnitTests
    };
    
    return tests;
};

module.exports = generator;
/*
gulp.task('default', function () {
    gulp.src('spec/test.js')
        .pipe(jasmine());
});

    

gulp.task('jasmine', function () {
    gulp.src('srcjasmine.js')
        .pipe(cover.instrument({
            pattern: ['**//*test*'],
            debugDirectory: 'debug'
        }))
        .pipe(jasmine())
        .pipe(cover.report({
            outFile: 'jasmine.html'
        }));
});
*/