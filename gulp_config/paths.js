'use strict';

var paths = {
    jsHintResults: 'test_results/**/jshint.html',
    app: 'app/**/*.js',
    client: 'client/**/*.js',
    gulp: ['gulpfile.js', 'gulp_config/**/*.js'],
    workers: 'workers/**/*.js',
    apiTests: 'tests/api/**/*.spec.js',
    appTests: 'tests/app/**/*.spec.js',
    clientTests: 'tests/client/**/*.spec.js',
    cpuTests: 'tests/cpu/**/*.spec.js',
    e2eTests: 'tests/e2e/**/*.spec.js',
    gulpTests: 'tests/gulp/**/*.spec.js',
    loadTests: 'tests/load/**/*.spec.js',
    memoryTests: 'tests/memory/**/*.spec.js',
    performanceTests: 'tests/performance/**/*.spec.js',
    workersTests: 'tests/workers/**/*.spec.js'
};

module.exports = paths;