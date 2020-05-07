import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { key, url } from '../options';
import { createRevokeService } from '../services/revokeService';
import {
  CLIArguments,
  InferArgumentIn,
  InferArgumentOut,
  InferArgumentsIn,
  InferArgumentsOut,
} from '../types';

const revokePositional = {
  description:
    'The name of the extension to revoke. Defaults to current working directory.',
  type: 'string' as 'string',
};

const revokeOptions = {
  url,
  key,
  force: {
    type: 'boolean' as 'boolean',
    default: false,
    alias: '-f',
  },
};

export type RevokeConfig = InferArgumentsIn<typeof revokeOptions> & {
  extensionName: InferArgumentIn<typeof revokePositional>;
};
type RevokeArguments = InferArgumentsOut<typeof revokeOptions> & {
  extensionName: InferArgumentOut<typeof revokePositional>;
};

const builder: CommandBuilder = yargs => {
  return yargs
    .positional('extensionName', revokePositional)
    .options(revokeOptions);
};

const handler = async (argv: CLIArguments<RevokeArguments>) => {
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
        name: argv.extensionName,
      },
    });
    await revoke();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const revokeCommand: CommandModule = {
  command: 'revoke [extensionName]',
  aliases: ['r', 'delete', 'remove', 'unpublish'],
  describe: 'Revoke extension from production.',
  builder,
  handler,
};
