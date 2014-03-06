'use strict';

module.exports = {
	test: {
		options: {
			title: 'Tests Complete',
			message: 'Finished Running Tests',
		}
	},
	build: {
		options: {
			title: 'Build Complete',
			message: 'Finished Creating Build',
		}
	},
	deploy: {
		options: {
			title: 'Deploy Complete',
			message: 'Finished Deploying Build',
		}
	},
	failure: {
		options: {
			title: 'Uh Oh',
			message: 'Something Went Wrong',
		}
	}
};