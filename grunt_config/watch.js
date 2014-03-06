'use strict';

module.exports = {
	jsGrunt: {
		files: ['*.js', 'grunt_config/*.js'],
		tasks: ['newer:jshint:main', 'passfail:test']
	},
	jsApp: {
		files: ['app/**/*.js'],
		tasks: ['newer:jshint:app', 'passfail:test']
	},
	jsClient: {
		files: ['client/**/*.js'],
		tasks: ['newer:jshint:client', 'passfail:test']
	},
	jsTests: {
		files: ['tests/**/*.js'],
		tasks: ['newer:jshint:tests', 'passfail:test']
	},
	jsWorkers: {
		files: ['workers/**/*.js'],
		tasks: ['newer:jshint:workers', 'passfail:test']
	}
};