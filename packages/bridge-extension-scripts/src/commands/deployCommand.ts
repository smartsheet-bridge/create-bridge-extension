import { CommandBuilder, CommandModule } from 'yargs';
import { middlewareAuth } from '../middleware/middlewareAuth';
import { alias, key, specFile, url } from '../options';
import { CreateDeployServiceFn } from '../services/deployService';
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

const createDeployBuilder: CommandBuilder = yargs => {
  return yargs
    .middleware(middlewareAuth)
    .positional('alias', alias)
    .options(deployArguments);
};

const createDeployHandler = (
  createDeployService: CreateDeployServiceFn
) => async (argv: CLIArguments<DeployArguments>) => {
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
};

export const createDeployCommand = (
  createDeployService: CreateDeployServiceFn
): CommandModule => ({
  command: 'deploy [alias]',
  aliases: ['d', 'publish'],
  describe: 'Deploy to production.',
  builder: createDeployBuilder,
  handler: createDeployHandler(createDeployService),
});
