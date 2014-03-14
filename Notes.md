    "async": "^0.2.10",
    "lodash": "^2.4.1",
    "mongoose": "^3.8.8",
    "express": "^4.0.0-rc2",
    "gulp-if": "0.0.5",
    "gulp-watch": "^0.5.2",
    "gulp-exec": "^1.0.4",
    "gulp-less": "^1.2.2",
    "gulp-recess": "^0.2.0",
    "gulp-clean": "^0.2.4",
    "gulp-minify-css": "^0.3.0",
    "gulp-rename": "^1.2.0"
    "gulp-sloc": "^1.0.3",
    "gulp-mversion": "^0.1.0",
    "gulp-prompt": "^0.1.0",
    "gulp-todo": "^0.1.5",

** make sure that watches don't break but everything else does

dev - when developing locally
2) Start the server and launch the browser window

gulpfile.js/gulp_config - same as javascript and make sure gulp exits
package.json - restart server - make sure that package.json is still valid
bower.json - restart client && server? - make sure that bower.json is still valid

dev on file change - when developing locally and you change a file
    client
        javascript
            jshint
            unit tests
            code coverage - if possible
            code coverage enforcement - if possible
            todo generation
            js minification
            cache busting
            angular template precompilation and concatenation
            js concatentation
            strip json comments
            !18n json file minification and concatenation (concatenation only)
            move files to the build directory
            phantomjs testing - if possible
            reload browser
        images
            image compression
            cache busting
            move files to the build directory
            reload browser
        less/css
            less linting
            less compilation
            css concatenation
            css linting
            css minification (if necessary)
            todo generation
            cache busting
            move files to the build directory
            reload browser
        html/templates
            html minification
            move files to the build directory
            cache busting
    server
        javascript
            jshint
            unit tests
            code coverage - if possible
            code coverage enforcement - if possible
            todo generation
            strip json comments
            move files to the build directory
            reload server
        views
            html minification
            move files to the build directory
    shared
        browserify - let the client/server handle it from there
        move files to the needed directories
    tests
        client
            jshint
            unit tests
            todo generation
        server
            jshint
            unit tests
            todo generation
        shared
            jshint
            unit tests
            todo generation
        workers
            jshint
            unit tests
            todo generation
        gulp
            jshint
            unit tests
            todo generation
    workers
        line count - uncompressed and compressed as two separate results
        file sizes - uncompressed and compressed as two separate results
        unit tests
        code coverage - if possible (only applies to node modules)
        code coverage enforcement - if possible (only applies to node modules)
        line count - uncompressed and compressed as two separate results
        file sizes - uncompressed and compressed as two separate results
        todo generation
        move files to the build directory
        reload server

test - when running tests
    Better to use a server for gulp-open and then attach live-reload to it

client javascript
    integration tests
    e2e tests
    performance tests
    load tests
    cpu tests
    memory tests
    browser testing (saucelabs or local depending on environment)
    phantomjs browser testing
    slimerjs browser testing
server javascript
    integration tests
    api tests
    e2e tests
    performance tests
    load tests
    cpu tests
    memory tests
client less
    less lint
client css
    css lint
workers
    integration tests
    api tests
    e2e tests
    performance tests
    load tests
    cpu tests
    memory tests

build - when doing a build
    client
        clean build
        line count - uncompressed and compressed as two separate results
        file sizes - uncompressed and compressed as two separate results
        todo generation
        changelog generation
        code documentation generator
        less compilation
        css concatenation
        css minification
        strip json comments
        js concatenation
        js mnification
        !18n json file minification and concatenation
        angular template precompilation and concatenation
        ngmin
        cache busting
        image compression
        html minification
        line count - uncompressed and compressed as two separate results
        file sizes - uncompressed and compressed as two separate results
        move files to the build directory
        bump version
        commit + tag
    server
        clean build
        line count - uncompressed and compressed as two separate results
        file sizes - uncompressed and compressed as two separate results
        todo generation
        changelog generation
        code documentation generator
        strip json comments
        !18n json file minification and concatenation (not sure on this one)
        line count - uncompressed and compressed as two separate results
        file sizes - uncompressed and compressed as two separate results
        move files to the build directory
        bump version
        commit + tag
    shared
        clean build
        browserify and let the others take care of the rest
    tests
        clean build
    workers
        same as server but this would only apply to those that are node modules otherwise we just copy them into the build

deploy - when preparing for a deploy (automated using travis-ci on a successful build)
    Static Site Generation (not now for when we need it for specific front-ends)
    CDN Integration (including !18n json files)
    Automatic git tag creation
    Server Notification

Server Upgrade
    if no migrations - Zero-downtime deploy is a must here
    if migrations - put into maintenance mode, run migrations, restart workers and turn off maintenace mode
    
new servers - Automatic setup/installation script
    automated installation script
    git checkout newest release for the type of server
    make sure everything is built in the appropriate mode
    run any needed migrations (not likely needed as the dbs should be separate from the codebase)
    register itself as a live server
    register with the proxy

Other Tools:
-------------------------
Use travis-ci to automatically render the readme.md with the appropriate travis-ci branch name (need an alternate for this for non-ci)
Automated scaling (up and down)
monitoring service (status, profiling, etc..)
logging service for distributed logs (these should be local as well)
dependency checker / notificatins
Code Generators - front-end, backend, tests, route creation
Test Stubbers - maybe automatic?
Command-line tool - scaling, status, restart (hard and soft), start, shutdown, etc..
Server REPL/Communication app
Background Worker Process Handler (dispatcher) - allow same and different servers
Server to Server communication protocol
Migration tool
Ability to run forever
uptime script / init.d script so that the server can be started on boot
Log Viewer Application (individual server and combined)
Performance Logging Tool
Performance and Analytics Tools
Performance Monitoring
Site Scraping Tool (static and dynamic)