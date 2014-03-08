'use strict';

module.exports = function(grunt){
	var options = {
		options: {
			force: true,
		},
		test: {
			success: function(){
				grunt.task.run('notify:test');
			},
			fail: function(){
				grunt.task.run('notify:failure');
			}
		},
		build: {
			success: function(){
				grunt.task.run('notify:build');
			},
			fail: function(){
				grunt.task.run('notify:failure');
			}
		},
		deploy: {
			success: function(){
				grunt.task.run('notify:deploy');
			},
			fail: function(){
				grunt.task.run('notify:failure');
			}
		},
	};

	return options;
};