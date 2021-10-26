import {
  createBasicFS,
  createBasicTTY,
  Logger,
} from '@smartsheet-bridge/extension-cli-logger';
import { join } from 'path';
import { MiddlewareFunction } from 'yargs';
import { CLIArguments } from '../types';

export const middlewareLogger: MiddlewareFunction<CLIArguments> = argv => {
  Logger.addTransport(
    createBasicTTY({
      levelFilter: (argv.loglevel && argv.loglevel.toLowerCase()) || 'info',
      debugPattern: argv.debug,
    })
  );
  Logger.addTransport(
    createBasicFS({
      path: join(process.cwd(), 'extension.log'),
    })
  );
  Logger.debug('extension-scripts')(argv);
};
