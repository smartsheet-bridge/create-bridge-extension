import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
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

class MinutesUserError extends UserError {
  public constructor() {
    super(
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
}

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
    coerce: (num?: number) => {
      if (typeof num !== 'number' || Number.isNaN(num)) {
        throw new MinutesUserError();
      }
      return Math.abs(num);
    },
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

const createLogsHandler = (createLogsService: CreateLogsServiceFn) => async (
  argv: CLIArguments<LogsArguments>
) => {
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
};

export const createLogsCommand = (
  createLogsService: CreateLogsServiceFn
): CommandModule => ({
  command: 'logs [alias]',
  aliases: ['l', 'log', 'stream-log', 'stream-logs'],
  describe: 'Stream logs from production.',
  builder,
  handler: createLogsHandler(createLogsService),
});
