import { CommandBuilder, CommandModule } from 'yargs';
import { middlewareAuth } from '../middleware/middlewareAuth';
import { alias, key, specFile, url } from '../options';
import { CreateBuildServiceFn } from '../services/buildService';
import { CreateDeployServiceFn } from '../services/deployService';
import type {
  CLIArguments,
  InferArgumentsIn,
  InferArgumentsOut,
} from '../types';

const buildArguments = {
  src: {
    type: 'string' as 'string',
    default: 'src',
    description: 'Root directory of all source files.',
  },
  out: {
    type: 'string' as 'string',
    default: 'lib',
    description: 'Root directory of all outputted files.',
  },
  clean: {
    type: 'boolean' as 'boolean',
    default: true,
    description:
      'Clean `out` folder before building. Run with `--no-clean` to prevent `out` folder from being deleted before build.',
  },
  // include,
  // exclude,
  staticDependencies: {
    type: 'array' as 'array',
    default: [] as string[],
    description:
      'Names of dependencies to be bundled with Extension code as-is unprocessed by the bundling tool.',
  },
  staticAssets: {
    type: 'array' as 'array',
    default: [] as string[],
    description:
      'Glob patterns for static files to be bundled with Extension code. Use to include files not referenced via `require` statements.',
  },
  symlinks: {
    type: 'boolean' as 'boolean',
    description: 'Follow symlinks when packaging extension for deployment.',
    default: false,
    coerce: (ln?: boolean) => (ln !== undefined ? ln : false),
  },
};

const argvToBuildArgs = (argv: CLIArguments<BuildArguments>) => ({
  src: argv.src,
  out: argv.out,
  options: {
    // exclude: argv.exclude,
    // include: argv.include,
    staticDependencies: argv.staticDependencies,
    clean: argv.clean,
    staticAssets: argv.staticAssets,
    symlinks: argv.symlinks,
  },
});

const deployArguments = {
  url,
  key,
  specFile,
  // include,
  // exclude,
  build: {
    type: 'boolean' as 'boolean',
    description:
      'Build code on deployment. Use `--no-build` to disable this feature.',
    default: true,
  },
  out: buildArguments.out,
  symlinks: buildArguments.symlinks,
};

export type BuildConfig = InferArgumentsIn<typeof buildArguments>;
export type BuildArguments = InferArgumentsOut<typeof buildArguments>;

export type DeployConfig = InferArgumentsIn<typeof deployArguments>;
export type DeployArguments = InferArgumentsOut<typeof deployArguments>;

const builder: CommandBuilder = yargs => {
  return yargs
    .middleware(middlewareAuth)
    .positional('alias', alias)
    .options({ ...buildArguments, ...deployArguments });
};

const argvToDeployArgs = (argv: CLIArguments<DeployArguments>) => ({
  host: argv.url,
  auth: argv.key,
  out: argv.out,
  options: {
    // exclude: argv.exclude,
    // include: argv.include,
    symlinks: argv.symlinks,
    specFile: argv.specFile,
  },
});

export const createDeployHandler = (
  createDeployService: CreateDeployServiceFn,
  createBuildService?: CreateBuildServiceFn
) => async (argv: CLIArguments<DeployArguments & BuildArguments>) => {
  if (argv.build && createBuildService) {
    const build = createBuildService(argvToBuildArgs(argv));
    await build();
  }

  const deploy = createDeployService(argvToDeployArgs(argv));
  await deploy();
};

export const createDeployCommand = (
  createDeployService: CreateDeployServiceFn,
  createBuildService?: CreateBuildServiceFn
): CommandModule => ({
  command: 'deploy [alias]',
  aliases: ['d', 'publish'],
  describe: 'Deploy to production.',
  builder,
  handler: createDeployHandler(createDeployService, createBuildService),
});
