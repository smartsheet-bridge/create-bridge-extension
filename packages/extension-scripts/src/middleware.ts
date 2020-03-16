import {
  createBasicFS,
  createBasicTTY,
  Logger,
} from '@smartsheet-bridge/extension-cli-logger';
import { join } from 'path';
import { MiddlewareFunction } from 'yargs';
import { CLIArguments } from './types';

const middleware: MiddlewareFunction<CLIArguments> = argv => {
  Logger.addOut(
    ...createBasicFS({ path: join(process.cwd(), 'extension.log') })
  );
  Logger.addErr(
    ...createBasicFS({ path: join(process.cwd(), 'extension.log') })
  );
  Logger.addOut(
    ...createBasicTTY({
      debugPattern: argv.debug,
      levelFilter: argv.loglevel,
      stream: process.stdout,
    })
  );
  Logger.addErr(
    ...createBasicTTY({
      debugPattern: argv.debug,
      levelFilter: argv.loglevel,
      stream: process.stderr,
    })
  );
  Logger.debug('extension-scripts')(argv);
};

export default middleware;
