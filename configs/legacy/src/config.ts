import { CLIConfig } from '@smartsheet-bridge/extension-scripts';

const Configuration: Partial<CLIConfig> = {
  specificationFile: 'plugin.json',
  exclude: [
    '**/.*',
    '**/*.log',
    '**/plugin.json',
    '**/node_modules/**',
    '**/test/**',
  ],
};

export = Configuration;
