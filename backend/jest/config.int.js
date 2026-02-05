import baseConfig from './config.base.js';

export default {
    ...baseConfig,
    setupFiles: ['<rootDir>/jest/setup.int.js'],
    globalSetup: '<rootDir>/jest/global.up.int.js',
    globalTeardown: '<rootDir>/jest/global.down.int.js',
    testEnvironment: 'node'
};