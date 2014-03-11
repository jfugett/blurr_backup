'use strict';

var mversion = require('gulp-mversion');
var args = require('yargs').default({type: 'dev'}).argv;
var combine = require('stream-combiner');

var generator = function generator(gulp, errorHandler, notifyHandler){
    var bumpVersion = function bumpVersion(){

        var type = args.type;
        type = type.toLocaleLowerCase();
        
        if(type === 'dev'){
            notifyHandler('Dev Build', 'Since this is a dev build we won\'t be bump the version');
            return true;
        }

        var passes = type.match(/^(\d+\.\d+\.\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/);
        if(type !== 'dev' && type !== 'patch' && type !== 'build' && type !== 'alpha' && type !== 'beta' && type !== 'prod' && !passes) {
            throw new Error('That is not a valid build');
        }
        
        if(type === 'alpha' || type === 'beta' || type === 'prod'){
            delete require.cache[require.resolve('./package.json')];
            var packageJson = require('./package.json');
            var version = packageJson.version.split('-');
            
            type = version[0] + '-' + type;
        }

        var combined = combine(
            gulp.src('./package.json'),
            mversion(type),
            gulp.dest('./')
        );
        
        combined.on('error', errorHandler);
    };
    
    return bumpVersion;
};

module.exports = generator;