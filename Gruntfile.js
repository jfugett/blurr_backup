'use strict';

module.exports = function gruntConfig(grunt){
    // setup base options for loading grunt configuration files
    var options = {
        config: {
            src: 'grunt_config/*.js'
        }
    };
    
    // load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    
    require('time-grunt')(grunt);
    
    // load grunt configuration automatically
    var configs = require('load-grunt-configs')(grunt, options);
    
    grunt.initConfig(configs);
    
    grunt.registerTask('default', 'Development Environment', function(){
        console.log('we made it here');
    });
};