'use strict';
// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
	'gruntFile': {
		options: {
			jshintrc: '.jshintrc'
		},
		src: ['Gruntfile.js', 'grunt_config/*.js']
	},
	'app': {
        options: {
            jshintrc: '.jshintrc'
        },
        src: ['/app/**/*.js']

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