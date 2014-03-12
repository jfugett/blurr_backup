    "gulp-sloc": "^1.0.3",
    "gulp-watch": "^0.5.2",
    "gulp-mversion": "^0.1.0",
    "gulp-prompt": "^0.1.0",
    "gulp-todo": "^0.1.5",
    "conventional-changelog": "0.0.6",
    "gulp-plato": "^0.2.1",
    "gulp-exec": "^1.0.4",
    "gulp-jasmine": "^0.2.0",
    "gulp-istanbul-enforcer": "^1.0.2",
    "gulp-istanbul": "^0.1.1",

** make sure that watches don't break but everything else should

dev - when developing locally
2) Start the server and launch the browser window

dev on file change - when developing locally and you change a file
    line count - uncompressed and compressed as two separate results
    file sizes - uncompressed and compressed as two separate results
    todo generation
    unit tests (front-end and backend)
    reload browser
    reload server
    less compilation
    js minification
    css minification
    image compression
    html minification
    browserify on shared files
    cache busting
    angular template precompilation and concatenation
    css concatenation
    js concatentation
    strip json comments
    move files to the build directory
    !18n json file minification and concatenation (concatenation only)
    
    ..  code coverage
    ..  code coverage enforcement
    ..  phantomjs testing

test - when running tests
    unit tests (front-end and backend)
    code coverage
    code coverage enforcement
    code complexity
    integration tests
    api tests
    e2e tests
    browser testing (saucelabs or local depending on environment)
    phantomjs browser testing (maybe using casper?)
    slimer browser testing (maybe using casper?)

build - when doing a build
    todo generation
    line count - uncompressed and compressed as two separate results
    file sizes - uncompressed and compressed as two separate results
    bump version
    less compilation
    js mnification
    css minification
    image compression
    html minification
    browserify on shared files
    cache busting
    angular template precompilation and concatenation
    ngmin
    css concatenation
    js concatenation
    strip json comments
    move files to the build directory
    code documentation generator
    !18n json file minification and concatenation

deploy - when preparing for a deploy (automated using travis-ci on a successful build)
    CDN Tasks (including !18n json files)
    zero-downtime deploy is a must here
    migrations need to be built in
    automatic git tag creation
    appropriate servers need to be notified so they can run the deploy code
    static site generation (not now for when we need it for specific front-ends)

new servers - Automatic setup/installation script

worker tests

performance tests
load tests
cpu tests
memory tests