'use strict';

module.exports = {
	'main': {
		options: {
			jshintrc: '.jshintrc'
		},
		src: ['*.js', 'grunt_config/*.js']
	},
	'app': {
		options: {
			jshintrc: '.jshintrc'
		},
		src: ['app/**/*.js']
	},
	'client': {
		options: {
			jshintrc: '.jshintrc'
		},
		src: ['client/**/*.js']
	},
	'tests': {
		options: {
			jshintrc: '.jshintrc'
		},
		src: ['tests/**/*.js']
	},
	'workers': {
		options: {
			jshintrc: '.jshintrc'
		},
		src: ['workers/**/*.js']
	}
};
