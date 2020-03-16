import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { key, url } from '../options';
import { createDeployService } from '../services/deployService';
import { CLIArguments } from '../types';
import { buildEnvironmentVariables } from '../utils';

interface DeployArguments {
  env: string[];
}

const buildOptions = (argv: CLIArguments<DeployArguments>) => ({
  include: argv.include || '**/**',
  exclude: [].concat(argv.exclude || []) as string[],
  symlinks: argv.symlinks !== undefined ? argv.symlinks : false,
  specFile: argv.specFile,
  env: buildEnvironmentVariables(argv.env),
});

const handler = async (argv: CLIArguments<DeployArguments>) => {
  try {
    if (typeof argv.url !== 'string') {
      throw new URLNotFoundError('deploy');
    }

    if (typeof argv.key !== 'string') {
      throw new KeyNotFoundError('deploy');
    }

    if (typeof argv.include !== 'string') {
      argv.include = '**/**';
    }

    const deploy = createDeployService({
      host: argv.url,
      auth: argv.key,
      options: buildOptions(argv),
    });
    await deploy();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const deployCommand: CommandModule = {
  command: 'deploy',
  describe: 'Deploy to production.',
  builder: {
    url,
    key,
    env: {
      type: 'array',
      default: [],
      description: 'Set environment variables on deployed extension.',
    },
  },
  handler,
};
