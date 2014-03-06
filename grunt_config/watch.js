'use strict';

module.exports = {
	jsGrunt: {
		files: ['*.js', 'grunt_config/*.js'],
		tasks: ['newer:jshint:main']
	},
	jsApp: {
		files: ['app/**/*.js'],
		tasks: ['newer:jshint:app']
	}
};