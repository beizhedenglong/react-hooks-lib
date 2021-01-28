module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: [
    '<rootDir>/jest.init.js',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
  ],
}
