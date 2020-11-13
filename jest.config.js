module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/__*__/**',
  ],
  coverageReporters: ['text', 'cobertura'],
  roots: ['packages/'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  moduleNameMapper: {
    '^@smartsheet-bridge/bridge-sdk':
      '<rootDir>/node_modules/@smartsheet-bridge/bridge-sdk',
    '^@smartsheet-bridge/(.*)$': '<rootDir>/packages/$1/src',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
};
