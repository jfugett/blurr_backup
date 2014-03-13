'use strict';

// here we require growler for notifications
var growler = require('growler');

// we need the filesystem module to read the image
var fs = require('fs');

// we create a new growl application here
var growlerApp = new growler.GrowlApplication('blurr', {
    // sets the icon to the gulp icon we can change this later
	icon: fs.readFileSync('gulp.png')
});

// this registers the app to send out notifications
growlerApp.setNotifications({
	Blurr: {}
});

module.exports = growlerApp;