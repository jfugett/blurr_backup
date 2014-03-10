'use strict';

var prompter = require('gulp-prompt');
var mversion = require('gulp-mversion');
var combine = require('stream-combiner');

var bumpVersionGenerator = function bumpVersionGenerator(gulp, errorHandler, notifyHandler){
    var bumpVersion = function bumpVersion(){
        notifyHandler('Your Input is Needed', 'We need to know what type of build this is');

        var combined = combine(
            gulp.src(['package.json']),
            prompter.prompt({
                type: 'list',
                name: 'bump',
                message: 'What type of build is this?',
                choices: ['dev', 'patch', 'minor', 'major', 'alpha', 'beta', 'prod']
            }, function(res){
                if(res.bump === 'dev'){
                    return true;
                }
                
                if(res.bump === 'alpha' || res.bump === 'beta' || res.bump === 'prod'){
                    delete require.cache[require.resolve('./package.json')];
                    var packageJson = require('./package.json');
                    var version = packageJson.version.split('-');
                    
                    res.bump = version[0] + '-' + res.bump;
                }
                
                gulp.src('package.json')
                    .pipe(mversion(res.bump))
                    .pipe(gulp.dest('./'));
            })
        );
        
        combined.on('error', errorHandler);
        
//        return combined;
    };
    
    return bumpVersion;
};

module.exports = bumpVersionGenerator;