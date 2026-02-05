import baseConfig from './config.base.js';

export default {
    ...baseConfig,
    //setupFiles: ['<rootDir>/jest/setup.unit.js'],
    globalSetup: '<rootDir>/jest/global.up.unit.js',
    testRegex: 'src/.*\\.spec\\.js$'
};