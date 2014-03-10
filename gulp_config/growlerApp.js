'use strict';

var growler = require('growler');
var fs = require('fs');

var growlerApp = new growler.GrowlApplication('blurr', {
	icon: fs.readFileSync('gulp.png')
});

growlerApp.setNotifications({
	Blurr: {}
});

module.exports = growlerApp;