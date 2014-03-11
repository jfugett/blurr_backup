'use strict';

var mversion = require('gulp-mversion');
var args = require('yargs').default({type: 'dev'}).argv;

var generator = function generator(gulp, errorHandler, notifyHandler){
    var bumpVersion = function bumpVersion(){

        var type = args.type;
        type = type.toLocaleLowerCase();
        
        if(type === 'dev'){
            notifyHandler('Dev Build', 'Since this is a dev build we won\'t be bump the version');
            return true;
        }
        
        if(type === 'alpha' || type === 'beta' || type === 'prod'){
            delete require.cache[require.resolve('./package.json')];
            var packageJson = require('./package.json');
            var version = packageJson.version.split('-');
            
            type = version[0] + '-' + type;
        }
        
        gulp.src('package.json')
            .pipe(mversion(type))
            .pipe(gulp.dest('./'));
    };
    
    return bumpVersion;
};

module.exports = generator;