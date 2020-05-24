module.exports = {
  
  collectCoverageFrom: [
    'Application/**/*.{js,jsx}',
  ],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['<rootDir>/enzyme.config.js'],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  //https://jestjs.io/docs/en/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  transform: {
    "^.+\\.(jsx|js)?$": "<rootDir>/node_modules/babel-jest"
  },

  // https://mongoosejs.com/docs/jest.html
  testEnvironment: 'node',
  
  setupFilesAfterEnv: ['mock-local-storage']
};
