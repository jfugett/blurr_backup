'use strict';

module.exports = {
	jsGrunt: {
		files: ['*.js', 'grunt_config/*.js'],
		tasks: ['newer:jshint:main']
	},
	jsApp: {
		files: ['app/**/*.js'],
		tasks: ['newer:jshint:app']
	},
	jsClient: {
		files: ['client/**/*.js'],
		tasks: ['newer:jshint:client']
	},
	jsTests: {
		files: ['tests/**/*.js'],
		tasks: ['newer:jshint:tests']
	},
	jsWorkers: {
		files: ['workers/**/*.js'],
		tasks: ['newer:jshint:workers']
	}
};