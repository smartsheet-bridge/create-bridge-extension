import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { middlewareAuth } from '../middleware/middlewareAuth';
import { alias, key, specFile, url } from '../options';
import { createDeployService } from '../services/deployService';
import type {
  CLIArguments,
  InferArgumentsIn,
  InferArgumentsOut,
} from '../types';
import { buildEnvironmentVariables } from '../utils';

const deployArguments = {
  url,
  key,
  specFile,
  env: {
    type: 'array' as 'array',
    string: true as true,
    description: 'Set environment variables on deployed extension.',
    coerce: buildEnvironmentVariables,
  },
  include: {
    type: 'string' as 'string',
    default: '**/**',
    description: 'Pattern to include filenames when packaging for deployment.',
  },
  exclude: {
    type: 'string' as 'string',
    description:
      'Pattern or array of patterns to exclude filenames when packaging for deployment.',
    default: '',
    coerce: (exclude: string | string[]) =>
      ([] as string[]).concat(exclude || []),
  },
  symlinks: {
    type: 'boolean' as 'boolean',
    description: 'Follow symlinks when packaging extension for deployment.',
    default: false,
    coerce: (ln?: boolean) => (ln !== undefined ? ln : false),
  },
};

export type DeployConfig = InferArgumentsIn<typeof deployArguments>;
type DeployArguments = InferArgumentsOut<typeof deployArguments>;

const builder: CommandBuilder = yargs => {
  return yargs
    .middleware(middlewareAuth)
    .positional('alias', alias)
    .options(deployArguments);
};

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
      options: {
        exclude: argv.exclude,
        include: argv.include,
        symlinks: argv.symlinks,
        specFile: argv.specFile,
        env: argv.env,
      },
    });
    await deploy();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const deployCommand: CommandModule = {
  command: 'deploy [alias]',
  aliases: ['d', 'publish'],
  describe: 'Deploy to production.',
  builder,
  handler,
};
