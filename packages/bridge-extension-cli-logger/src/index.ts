import * as chalk from 'chalk';
import { Writable } from 'stream';
import * as Winston from 'winston';
import { regexp } from './formats/regexp';
import { strip } from './formats/strip';
import { tty } from './formats/tty';
import { Logger as Base } from './Logger';

export const Chalk: typeof chalk.default = chalk.default;
export * from './errors/AbstractError';
export * from './errors/UserError';
class LoggerInstance extends Base {
  private static instance: LoggerInstance;

  public static getInstance(): LoggerInstance {
    if (!LoggerInstance.instance) {
      LoggerInstance.instance = new LoggerInstance();
    }
    return LoggerInstance.instance;
  }
}

export const Logger = LoggerInstance.getInstance();

/**
 * Creates a basic terminal logger to log to a terminal.
 */
export const createBasicTTY = ({
  debugPattern,
  levelFilter = 'info',
}: {
  debugPattern?: string | RegExp;
  levelFilter?: string;
  stream?: Writable;
}): Writable =>
  new Winston.transports.Console({
    level: levelFilter.toLowerCase(),
    format: Winston.format.combine(regexp({ pattern: debugPattern }), tty()),
  });

/**
 * Creates a basic file system logger to log to a file.
 */
export const createBasicFS = ({ path }: { path: string }): Writable =>
  new Winston.transports.File({
    options: { flags: 'w' },
    level: 'verbose',
    format: Winston.format.combine(tty(), strip()),
    filename: path,
  });
