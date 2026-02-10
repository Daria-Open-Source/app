import baseConfig from './base.config.js';

export default {
    ...baseConfig,
    //setupFiles: ['<rootDir>/jest/setup.unit.js'],
    globalSetup: '<rootDir>/jest/unit.global.up.js',
    testRegex: 'src/.*\\.spec\\.js$'
};