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

	
	// initialize the grunt config
	grunt.initConfig(configs);

	// default task to be run for development
	grunt.registerTask('default', 'Development Environment', function(){
		console.log('we made it here');
	});

	// runs only the tests disregarding building, deploying, starting the server, etc..
	grunt.registerTask('test', 'Run Tests Only', function(){
		grunt.task.run('jshint');

		grunt.task.run('notify:jshint');

		grunt.task.run('passfail:all');
	});

	//grunt.registerTask('passfail', 'Internal Only', function(){
	//	console.log(grunt.fail.errorcount);
	//	console.log(grunt.fail.warncount);
	//});
};
