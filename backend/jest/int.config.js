import baseConfig from './base.config.js';

export default {
    ...baseConfig,
    setupFiles: ['<rootDir>/jest/int.setup.js'],
    globalSetup: '<rootDir>/jest/int.global.up.js',
    globalTeardown: '<rootDir>/jest/int.global.down.js',
    testRegex: 'tests/.*\\.test\\.js$'
};