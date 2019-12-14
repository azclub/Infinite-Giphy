module.exports = {
  setupFiles: ['dotenv/config', '<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/', '<rootDir>/__mocks__/'],
  moduleNameMapper: {
    "\\.(scss)$": "<rootDir>/__mocks__/style-mock.js"
  }
}