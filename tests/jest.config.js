/** @type {import('jest').Config} */
module.exports = {
  rootDir: '../',
  testMatch: [
    '<rootDir>/tests/**/*.ts'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  testEnvironment: 'node',
}