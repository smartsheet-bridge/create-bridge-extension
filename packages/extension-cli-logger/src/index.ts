import * as chalk from 'chalk';
import { createWriteStream } from 'fs';
import { Writable } from 'stream';
import { Logger as Base, LogLevel } from './Logger';
import { LogFilterStream } from './streams/LogFilterStream';
import { LogFormatStream } from './streams/LogFormatStream';
import { LogNormalizeStream } from './streams/LogNormalizeStream';
import { LogPatternStream } from './streams/LogPatternStream';
import { StripAnsiStream } from './streams/StripAnsiStream';

export const Chalk: typeof chalk.default = chalk.default;
export * from './errors/AbstractError';
export * from './errors/UserError';
export * from './Logger';
export * from './LoggerOut';

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

export const createBasicTTY = ({
  debugPattern,
  levelFilter = LogLevel.INFO,
  stream = process.stdout,
}: {
  debugPattern?: string | RegExp;
  levelFilter?: string | LogLevel;
  stream?: Writable;
}): Writable[] => [
  new LogNormalizeStream(),
  new LogFilterStream(levelFilter),
  new LogPatternStream(debugPattern),
  new LogFormatStream(),
  stream,
];

export const createBasicFS = ({ path }: { path: string }): Writable[] => [
  new LogNormalizeStream(),
  new StripAnsiStream(),
  new LogFormatStream(),
  createWriteStream(path),
];
