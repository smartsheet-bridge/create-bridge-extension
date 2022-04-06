import { CommandBuilder, CommandModule } from 'yargs';
import { exclude, include } from '../options';
import { CreateBuildServiceFn } from '../services/buildService';
import type {
  CLIArguments,
  InferArgumentsIn,
  InferArgumentsOut,
} from '../types';

export const buildArguments = {
  src: {
    type: 'string' as 'string',
    default: 'src',
    description: 'Root directory of all source files.',
  },
  out: {
    type: 'string' as 'string',
    default: 'lib',
    description: 'Root directory of all outputed files.',
  },
  clean: {
    type: 'boolean' as 'boolean',
    default: true,
    description:
      'Clean `out` folder before building. Run with `--no-clean` to prevent `out` folder from being deleted before build.',
  },
  include,
  exclude,
  bundlingSkipDeps: {
    type: 'array' as 'array',
    description:
      'Glob patterns for static files to be bundled with Extension code',
    coerce: (list: any[]): string[] => list.map(l => l.toString()),
  },
};

export type BuildConfig = InferArgumentsIn<typeof buildArguments>;
export type BuildArguments = InferArgumentsOut<typeof buildArguments>;

export const argvToBuildArgs = (argv: CLIArguments<BuildArguments>) => ({
  src: argv.src,
  out: argv.out,
  options: {
    exclude: argv.exclude,
    include: argv.include,
    bundlingSkipDeps: argv.bundlingSkipDeps,
    clean: argv.clean,
  },
});

const builder: CommandBuilder = yargs => {
  return yargs.options(buildArguments);
};

const createBuildHandler = (createBuildService: CreateBuildServiceFn) => async (
  argv: CLIArguments<BuildArguments>
) => {
  const build = createBuildService(argvToBuildArgs(argv));
  await build();
};

export const createBuildCommand = (
  createBuildService: CreateBuildServiceFn
): CommandModule => ({
  command: 'build',
  aliases: ['b', 'compile'],
  describe: 'Build extension for production.',
  builder,
  handler: createBuildHandler(createBuildService),
});
