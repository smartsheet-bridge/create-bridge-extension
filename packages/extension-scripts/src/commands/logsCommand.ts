import {
  Chalk,
  Logger,
  UserError,
} from '@smartsheet-bridge/extension-cli-logger';
import { CommandModule } from 'yargs';
import { AuthNotFoundError } from '../errors/AuthNotFoundError';
import { HostNotFoundError } from '../errors/HostNotFoundError';
import { createLogsService } from '../services/logsService';
import { CLIArguments } from '../types';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECOND = MILLISECONDS_PER_SECOND;
const MINUTE = SECOND * SECONDS_PER_MINUTE;

const handler = async (argv: CLIArguments) => {
  try {
    if (typeof argv.host !== 'string') {
      throw new HostNotFoundError('logs');
    }

    if (typeof argv.auth !== 'string') {
      throw new AuthNotFoundError('logs');
    }

    if (typeof argv.minutes !== 'number' || Number.isNaN(argv.minutes)) {
      throw new UserError(
        `Parameter 'minutes' must be a number!`,
        `You can use the ${Chalk.cyan(
          '--minutes'
        )} flag to travel back in time and view logs from up to 60 minutes ago.`,
        {
          examples: [
            `extension-scripts logs --minutes=${Chalk.cyan(
              '[insert minutes here]'
            )}`,
            `extension-scripts logs -m ${Chalk.cyan('[insert minutes here]')}`,
          ],
        }
      );
    }

    const logs = createLogsService({
      host: argv.host,
      auth: argv.auth,
      milliseconds: Math.abs(argv.minutes) * MINUTE,
    });
    await logs();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const logsCommand: CommandModule = {
  command: 'logs',
  describe: 'Logs logs from production.',
  builder: {
    host: {
      default: undefined,
    },
    auth: {
      default: undefined,
    },
    minutes: {
      default: 0,
      type: 'number',
      alias: 'm',
      coerce: (num: unknown) =>
        typeof num === 'number' && !Number.isNaN(num) ? Math.abs(num) : num,
    },
  },
  handler,
};
