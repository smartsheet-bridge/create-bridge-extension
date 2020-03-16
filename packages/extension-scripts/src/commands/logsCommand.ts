import {
  Chalk,
  Logger,
  UserError,
} from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { key, url } from '../options';
import { createLogsService } from '../services/logsService';
import { CLIArguments } from '../types';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECOND = MILLISECONDS_PER_SECOND;
const MINUTE = SECOND * SECONDS_PER_MINUTE;

interface LogsArguments {
  minutes: number;
  name?: string;
}

const builder: CommandBuilder = yargs => {
  return yargs
    .positional('name', {
      description:
        'The name of the extension to stream logs from. Defaults to current working directory.',
      type: 'string',
    })
    .options({
      url,
      key,

      minutes: {
        default: 0,
        type: 'number',
        alias: 'm',
        description:
          'The number of minutes in the past to start streaming the logs from.',
        coerce: (num: unknown) =>
          typeof num === 'number' && !Number.isNaN(num) ? Math.abs(num) : num,
      },
    });
};

const handler = async (argv: CLIArguments<LogsArguments>) => {
  try {
    if (typeof argv.url !== 'string') {
      throw new URLNotFoundError('logs');
    }

    if (typeof argv.key !== 'string') {
      throw new KeyNotFoundError('logs');
    }

    if (typeof argv.minutes !== 'number' || Number.isNaN(argv.minutes)) {
      throw new UserError(
        `Parameter 'minutes' must be a number!`,
        `You can use the ${Chalk.cyan(
          '--minutes'
        )} flag to travel back in time and view logs from up to 60 minutes ago.`,
        {
          items: [
            `extension-scripts logs --minutes=${Chalk.cyan(
              '[insert minutes here]'
            )}`,
            `extension-scripts logs -m ${Chalk.cyan('[insert minutes here]')}`,
          ],
        }
      );
    }

    const logs = createLogsService({
      host: argv.url,
      auth: argv.key,
      options: {
        milliseconds: Math.abs(argv.minutes) * MINUTE,
        specFile: argv.specFile,
        name: argv.name,
      },
    });
    await logs();
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const logsCommand: CommandModule = {
  command: 'logs',
  describe: 'Stream logs from production.',
  builder,
  handler,
};
