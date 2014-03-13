'use strict';

var paths = {
    'gulpScripts': ['gulpfile.js', 'gulp_config/**/*.js'],
    'appScripts': ['app/**/*.js'],
    'clientScripts': ['client/**/*.js'],
    'workerScripts': ['workers/**/*.js'],
    'apiTests': ['tests/api/**/*.js'],
    'appTests': ['tests/app/**/*.js'],
    'clientTests': ['tests/client/**/*.js'],
    'cpuTests': ['tests/cpu/**/*.js'],
    'e2eTests': ['tests/e2e/**/*.js'],
    'loadTests': ['tests/load/**/*.js'],
    'memoryTests': ['tests/memory/**/*.js'],
    'performanceTests': ['tests/performance/**/*.js'],
    'workerTests': ['tests/workers/**/*.js'],
    'buildPath': 'build',
    'lessSource': ['client/style/**/*.less', 'client/style/**/*.lss'],
    'lessDestination': 'build/client/style/',
    'cssSource': ['build/client/style/**/*.css'],
    'cssDestination': 'build/client/style'
};

module.exports = paths;