import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { key, url } from '../options';
import { createRevokeService } from '../services/revokeService';
import { CLIArguments } from '../types';

const handler = async (argv: CLIArguments) => {
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
      force: argv.force as boolean,
    });
    await revoke();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const revokeCommand: CommandModule = {
  command: 'revoke',
  describe: 'Revoke extension from production.',
  builder: {
    url,
    key,
    force: {
      type: 'boolean',
      default: false,
      alias: '-f',
    },
  },
  handler,
};
