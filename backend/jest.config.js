export default {
    // Use setupFiles to run a script BEFORE the test environment is even established
    setupFiles: ['<rootDir>/jest.setup.js'],
  
    // Ensure we are looking for the right files
    testEnvironment: 'node',
    transform: {}, // Since you're using ESM, you likely don't need heavy transforms
};