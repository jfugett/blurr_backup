'use strict';

// get the desired build if any (only used in build and deploy)
var args = require('yargs').string('type').default({type: 'dev'}).argv;
var type = args.type;

var buildTypeParser = function buildTypeParser(gulp){
    // regular expression to ensure forced build names are consistent with semver notation
    var semverPattern = /^(\d+\.\d+\.\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

    // see if the type is a valid semver
    var typePasses = type.match(semverPattern);

    // make sure the build type is valid
    if(type !== 'dev' &&
        type !== 'patch' &&
        type !== 'minor' &&
        type !== 'major' &&
        type !== 'alpha' &&
        type !== 'beta' &&
        type !== 'prod' &&
        !typePasses){
            throw new Error('that is not a valid build');
        }

    // assign this to gulp so we have access to it in our build/deploy tasks as needed
    gulp.type = type;
};

module.exports = buildTypeParser;