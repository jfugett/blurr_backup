'use strict';

module.exports = function(grunt){
	var options = {
		options: {
			force: true
		},
		all: {
			success: function() {
				grunt.task.run('notify:success');
			},
			fail: function() {
				grunt.task.run('notify:failed');
			}
		}
	};

	return options;
};