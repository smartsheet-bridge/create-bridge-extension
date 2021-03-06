module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/src/**/*.{js,jsx,ts,tsx}',
    '!packages/bridge-extension-scripts/src/{index,types}.ts',
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
    '^@smartsheet-bridge/(.*)$': '<rootDir>/packages/bridge-$1/src',
    '^@smartsheet-extensions/(.*)$': '<rootDir>/packages/extensions-$1/src',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
};
