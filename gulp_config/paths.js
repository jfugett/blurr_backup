'use strict';

var paths = {
    jsHintResults: 'test_results/jsHint.html',
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
    workersTests: 'tests/workers/**/*.spec.js',
    appCoverage: 'test_results/app/',
    clientCoverage: 'test_results/client/',
    gulpCoverage: 'test_results/gulp/',
    workersCoverage: 'test_results/workers/',
    appComplexityReport: 'test_results/app/complexity_report/',
    clientComplexityReport: 'test_results/client/complexity_report/',
    gulpComplexityReport: 'test_results/gulp/complexity_report/',
    workersComplexityReport: 'test_results/workers/complexity_report/',
    apiTestsComplexityReport: 'test_results/tests/api/complexity_report/',
    appTestsComplexityReport: 'test_results/tests/app/complexity_report/',
    clientTestsComplexityReport: 'test_results/tests/client/complexity_report/',
    cpuTestsComplexityReport: 'test_results/tests/cpu/complexity_report/',
    e2eTestsComplexityReport: 'test_results/tests/e2e/complexity_report/',
    gulpTestsComplexityReport: 'test_results/tests/gulp/complexity_report/',
    loadTestsComplexityReport: 'test_results/tests/load/complexity_report/',
    memoryTestsComplexityReport: 'test_results/tests/memory/coplexity_report/',
    performanceTestsComplexityReport: 'test_results/tests/performance/complexity_report/',
    workersTestsComplexityReport: 'test_results/tests/workers/complexity_report'
};

module.exports = paths;