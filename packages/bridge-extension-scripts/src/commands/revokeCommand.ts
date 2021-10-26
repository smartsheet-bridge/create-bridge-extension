import { CommandBuilder, CommandModule } from 'yargs';
import { middlewareAuth } from '../middleware/middlewareAuth';
import { alias, extension, key, specFile, url } from '../options';
import { CreateRevokeServiceFn } from '../services/revokeService';
import type {
  CLIArguments,
  InferArgumentIn,
  InferArgumentOut,
  InferArgumentsIn,
  InferArgumentsOut,
} from '../types';

const revokeOptions = {
  url,
  key,
  specFile,
  extension,
  force: {
    type: 'boolean' as 'boolean',
    default: false,
    alias: '-f',
  },
};

export type RevokeConfig = InferArgumentsIn<typeof revokeOptions> & {
  alias: InferArgumentIn<typeof alias>;
};
type RevokeArguments = InferArgumentsOut<typeof revokeOptions> & {
  alias: InferArgumentOut<typeof alias>;
};

const builder: CommandBuilder = yargs => {
  return yargs
    .middleware(middlewareAuth)
    .positional('alias', alias)
    .options(revokeOptions);
};

const createRevokeHandler = (
  createRevokeService: CreateRevokeServiceFn
) => async (argv: CLIArguments<RevokeArguments>) => {
  const revoke = createRevokeService({
    host: argv.url,
    auth: argv.key,
    options: {
      force: argv.force,
      specFile: argv.specFile,
      name: argv.extension,
    },
  });
  await revoke();
};

export const createRevokeCommand = (
  createRevokeService: CreateRevokeServiceFn
): CommandModule => ({
  command: 'revoke [alias]',
  aliases: ['r', 'delete', 'remove', 'unpublish'],
  describe: 'Revoke extension from production.',
  builder,
  handler: createRevokeHandler(createRevokeService),
});
