import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
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

const handler = (createRevokeService: CreateRevokeServiceFn) => async (
  argv: CLIArguments<RevokeArguments>
) => {
  try {
    if (typeof argv.url !== 'string') {
      throw new URLNotFoundError('revoke');
    }

    if (typeof argv.key !== 'string') {
      throw new KeyNotFoundError('revoke');
    }

    if (typeof argv.force !== 'boolean') {
      argv.force = false;
    }

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
  } catch (e) {
    Logger.error(e);
  }
};

export const revokeCommand = (
  createRevokeService: CreateRevokeServiceFn
): CommandModule => ({
  command: 'revoke [alias]',
  aliases: ['r', 'delete', 'remove', 'unpublish'],
  describe: 'Revoke extension from production.',
  builder,
  handler: handler(createRevokeService),
});
