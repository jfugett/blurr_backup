'use strict';

var fs = require('fs');
var _ = require('lodash');
var cleaned = false;
var outputFile = './test_results/jshint.html';

var template = fs.readFileSync('./gulp_config/reporterTemplate.html');
var outerTemplate = fs.readFileSync('./gulp_config/reporterOuterTemplate.html');

var writeOutput = function writeOutput(output){
    console.log('writing');
    try{
        fs.appendFileSync(outputFile, output);
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    reporter: function (results) {
        var output = '';
        
        if(!cleaned){
            console.log('cleaning');
            try{
            fs.unlinkSync(outputFile);
            } catch(error){
                // we're ignoring the error because the file likely didn't exist
            }

            cleaned = true;
        }

        var compiled = _.template(template, null, {'variable': 'results'});
        var body = compiled(results);
        
        compiled = _.template(outerTemplate, null, {'variable': 'body'});
        output = compiled(body);

        if (results.length > 0) {
            writeOutput(output);
        }
    },
};