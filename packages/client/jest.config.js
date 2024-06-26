import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/api(.*)$': '<rootDir>/src/api/$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks/$1',
    '^@/pages(.*)$': '<rootDir>/src/pages/$1',
    '^@/assets(.*)$': '<rootDir>/src/assets/$1',
    '^@/store(.*)$': '<rootDir>/src/store/$1',
    '^@/slices(.*)$': '<rootDir>/src/store/slices/$1',
    '^@/routing(.*)$': '<rootDir>/src/routing/$1',
    '^@/components(.*)$': '<rootDir>/src/components/$1',
    '^@/utils(.*)$': '<rootDir>/src/utils/$1',
  },
}
