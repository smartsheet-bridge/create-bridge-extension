import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandModule } from 'yargs';
import { AuthNotFoundError } from '../errors/AuthNotFoundError';
import { HostNotFoundError } from '../errors/HostNotFoundError';
import { createRevokeService } from '../services/revokeService';
import { CLIArguments } from '../types';

const handler = async (argv: CLIArguments) => {
  try {
    if (typeof argv.host !== 'string') {
      throw new HostNotFoundError('revoke');
    }

    if (typeof argv.auth !== 'string') {
      throw new AuthNotFoundError('revoke');
    }

    if (typeof argv.force !== 'boolean') {
      argv.force = false;
    }

    const revoke = createRevokeService({
      host: argv.host,
      auth: argv.auth,
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
    host: {
      default: undefined,
    },
    auth: {
      default: undefined,
    },
    force: {
      type: 'boolean',
      default: false,
      alias: '-f',
    },
  },
  handler,
};
