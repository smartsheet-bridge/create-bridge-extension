import type { CLIConfig } from '@smartsheet-bridge/extension-scripts';

const Configuration: CLIConfig = {
  specFile: 'extension.json',
  exclude: [
    '**/.*',
    '**/*.log',
    '**/node_modules/**',
    '**/{test,tests,mock,mocks,__test__,__tests__,__mock__,__mocks__}/**',
    '**/*.{spec,test}.{js,ts}',
  ],
};

export = Configuration;
