'use strict';

// include the file system for file manipulation
var fs = require('fs');

// include lodash for templating
var _ = require('lodash');

// this will be used to know when to delete the jshint.html file
var cleaned = false;

// here we get the main template
var template = fs.readFileSync('./gulp_config/reporterTemplate.html');

// now we get the outer template that has all of the html body
var outerTemplate = fs.readFileSync('./gulp_config/reporterOuterTemplate.html');

var jsHintReporter = {
    // this is where the output will be sent
    outputFile: './test_results/jshint.html',

    // this function is used to write the output to the destination
    writeOutput: function writeOutput(output){
        // wrap this in a try catch just so it doesn't shut down on us
        try{
            fs.appendFileSync(jsHintReporter.outputFile, output);
        } catch(error) {
            console.log(error);
        }
    },

    
    // this function takes the results and builds up the html body
    reporter: function (results) {
        // see if we need to remove the existing report
        if(!cleaned){
            try{
                fs.unlinkSync(jsHintReporter.outputFile);
            } catch(error){
                // we're ignoring the error because the file likely didn't exist
            }

            // set cleaned to true so we don't remove our own writes
            cleaned = true;
        }

        // compile the main template using the results
        var compiled = _.template(template, null, {'variable': 'results'});
        var body = compiled(results);
        
        // if there weren't any errors replace the body
        // @todo - Make this into its own template and use it instead of embedding the HTML
        if(results.length === 0){
            console.log(results);
            //body = '<tr colspan="5"><td>No Errors Found!</td></tr>';
        }
        
        // wrap the output inside the outer template
        compiled = _.template(outerTemplate, null, {'variable': 'body'});
        var output = compiled(body);

        // send the output to be written
        jsHintReporter.writeOutput(output);
    },
};

module.exports = jsHintReporter;
