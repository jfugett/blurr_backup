'use strict';

var fs = require('fs');
var changelog = require('conventional-changelog');

var generateChangeLog = function generateChangeLog(){
    var packageJson = require('../package.json');
    
    changelog({
        repository: 'https://github.com/jfugett/blurr',
        version: packageJson.version,
        file: 'CHANGELOG.md',
    }, function(err, log){
        fs.writeFileSync('CHANGELOG.md', log);
    });
};

module.exports = generateChangeLog;