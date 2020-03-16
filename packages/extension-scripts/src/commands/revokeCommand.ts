import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { key, url } from '../options';
import { createRevokeService } from '../services/revokeService';
import { CLIArguments } from '../types';

interface RevokeArguments {
  force: boolean;
  name?: string;
}

const builder: CommandBuilder = yargs => {
  return yargs
    .positional('name', {
      description:
        'The name of the extension to revoke. Defaults to current working directory.',
      type: 'string',
    })
    .options({
      url,
      key,
      force: {
        type: 'boolean',
        default: false,
        alias: '-f',
      },
    });
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
        specPath: argv.specificationFile,
        name: argv.name,
      },
    });
    await revoke();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const revokeCommand: CommandModule = {
  command: 'revoke [name]',
  describe: 'Revoke extension from production.',
  builder,
  handler,
};
