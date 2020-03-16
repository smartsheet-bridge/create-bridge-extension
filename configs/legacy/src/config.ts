import { CLIConfig } from '@smartsheet-bridge/extension-scripts';

const Configuration: CLIConfig = {
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
