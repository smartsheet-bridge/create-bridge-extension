import {
  createBasicFS,
  createBasicTTY,
  Logger,
} from '@smartsheet-bridge/extension-cli-logger';
import { join } from 'path';
import { MiddlewareFunction } from 'yargs';
import { LoglevelNotRecognized } from '../errors/LoglevelNotRecognized';
import options, { LOGLEVEL_OPTIONS } from '../options';
import { CLIArguments } from '../types';

const validatedLoglevel = (lvl: string) =>
  typeof lvl === 'string' && LOGLEVEL_OPTIONS.includes(lvl.toLowerCase());

export const middlewareLogger: MiddlewareFunction<CLIArguments> = argv => {
  // Set logger transport for `extension.log` first to catch all.
  Logger.addTransport(
    createBasicFS({
      path: join(process.cwd(), 'extension.log'),
    })
  );

  const userLoglevel = (argv.loglevel || 'info').toLowerCase();
  const isValidLoglevel = validatedLoglevel(userLoglevel);
  argv.loglevel = isValidLoglevel ? userLoglevel : 'info';
  argv[options.loglevel.alias] = argv.loglevel;
  Logger.addTransport(
    createBasicTTY({
      levelFilter: argv.loglevel,
      debugPattern: argv.debug,
    })
  );

  const debug = Logger.debug('extension-scripts');
  debug(`Setting TTY loglevel to ${argv.loglevel}`);
  debug(argv);
  if (!isValidLoglevel) {
    Logger.warn(new LoglevelNotRecognized(userLoglevel).toOut());
  }
};
