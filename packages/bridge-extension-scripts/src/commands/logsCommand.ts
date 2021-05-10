import {
  Chalk,
  Logger,
  UserError,
} from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { middlewareAuth } from '../middleware/middlewareAuth';
import { alias, extension, key, specFile, url } from '../options';
import { CreateLogsServiceFn } from '../services/logsService';
import type {
  CLIArguments,
  InferArgumentIn,
  InferArgumentOut,
  InferArgumentsIn,
  InferArgumentsOut,
} from '../types';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECOND = MILLISECONDS_PER_SECOND;
const MINUTE = SECOND * SECONDS_PER_MINUTE;

const logsOptions = {
  url,
  key,
  specFile,
  extension,
  minutes: {
    default: 0,
    type: 'number' as 'number',
    alias: 'm',
    description:
      'The number of minutes in the past to start streaming the logs from.',
    coerce: (num?: number) =>
      typeof num === 'number' && !Number.isNaN(num) ? Math.abs(num) : num,
  },
};

export type LogsConfig = InferArgumentsIn<typeof logsOptions> & {
  alias: InferArgumentIn<typeof alias>;
};
type LogsArguments = InferArgumentsOut<typeof logsOptions> & {
  alias: InferArgumentOut<typeof alias>;
};

const builder: CommandBuilder = yargs => {
  return yargs
    .middleware(middlewareAuth)
    .positional('alias', alias)
    .options(logsOptions);
};

const handler = (createLogsService: CreateLogsServiceFn) => async (
  argv: CLIArguments<LogsArguments>
) => {
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
        name: argv.extension,
      },
    });
    await logs();
  } catch (e) {
    Logger.error(e);
  }
};

export const logsCommand = (
  createLogsService: CreateLogsServiceFn
): CommandModule => ({
  command: 'logs [alias]',
  aliases: ['l', 'log', 'stream-log', 'stream-logs'],
  describe: 'Stream logs from production.',
  builder,
  handler: handler(createLogsService),
});
