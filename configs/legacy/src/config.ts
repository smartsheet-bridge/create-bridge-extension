import { CLIArgumentsBase } from '@smartsheet-bridge/extension-scripts';

const Configuration: Partial<CLIArgumentsBase> = {
  specFile: 'plugin.json',
  exclude: [
    '**/.*',
    '**/*.log',
    '**/plugin.json',
    '**/node_modules/**',
    '**/test/**',
  ],
};

export = Configuration;
