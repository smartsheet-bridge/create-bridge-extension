import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandModule } from 'yargs';
import { AuthNotFoundError } from '../errors/AuthNotFoundError';
import { HostNotFoundError } from '../errors/HostNotFoundError';
import { createDeployService } from '../services/deployService';
import { CLIArguments } from '../types';

const buildOptions = (argv: CLIArguments) => ({
  include: argv.include || '**/**',
  exclude: [].concat(argv.exclude) as string[],
  symlinks: argv.symlinks !== undefined ? argv.symlinks : false,
  specificationFile: argv.specificationFile,
});

const handler = async (argv: CLIArguments) => {
  try {
    if (typeof argv.host !== 'string') {
      throw new HostNotFoundError('deploy');
    }

    if (typeof argv.auth !== 'string') {
      throw new AuthNotFoundError('deploy');
    }

    if (typeof argv.include !== 'string') {
      argv.include = '**/**';
    }

    const deploy = createDeployService({
      host: argv.host,
      auth: argv.auth,
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
    host: {
      default: undefined,
    },
    auth: {
      default: undefined,
    },
  },
  handler,
};
