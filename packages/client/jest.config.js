const dotenv = require('dotenv')

dotenv.config()

const config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@/api(.*)$': '<rootDir>/src/api/$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks/$1',
    '^@/pages(.*)$': '<rootDir>/src/pages/$1',
    '^@/assets(.*)$': '<rootDir>/src/assets/$1',
    '^@/store(.*)$': '<rootDir>/src/store/$1',
    '^@/slices(.*)$': '<rootDir>/src/store/slices/$1',
    '^@/routing(.*)$': '<rootDir>/src/routing/$1',
    '^@/components(.*)$': '<rootDir>/src/components/$1',
    '^@/utils(.*)$': '<rootDir>/src/utils/$1',
    '^@/constants(.*)$': '<rootDir>/src/constants/$1',
    '^@/__mocks__(.*)$': '<rootDir>/src/__mocks__/$1',
  },
  testTimeout: 200000,
}

module.exports = config
