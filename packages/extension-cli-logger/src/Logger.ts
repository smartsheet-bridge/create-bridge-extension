import { AssertionError } from 'assert';
import Chalk from 'chalk';
import { EOL } from 'os';
import { Writable } from 'stream';
import * as Util from 'util';
import * as Winston from 'winston';
import { AbstractError } from './errors/AbstractError';
import { LogLevel, LOG_LEVELS } from './Levels';

const indentNewLines = (replacement: string = `${EOL}${ASCII_TAB} `) => (
  arg: any
) => {
  return Util.formatWithOptions(
    { colors: true, compact: false, breakLength: Infinity, depth: 7 },
    arg
  ).replace(new RegExp(EOL, 'g'), replacement);
};

const ASCII_TAB: string = '  ';
const GOLDEN_RATIO: number = 0.618033988749895;
const ERROR = Chalk.hex('#E57373');
const WARN = Chalk.hex('#FFF176');

export interface LogEntry {
  message: string;
  level: LogLevel;
  grouped?: boolean;
  pattern?: string;
}

export class Logger {
  private hue: number = Math.random();
  private startTime: number | undefined;
  private logger: Winston.Logger;

  public constructor(options: Omit<Winston.LoggerOptions, 'levels'> = {}) {
    this.logger = Winston.createLogger({
      ...options,
      levels: LOG_LEVELS,
    });
  }

  public addTransport(transport: Writable) {
    this.logger.add(transport);
  }

  /**
   * Print out one or more strings at `info` severity.
   * @param args
   */
  public info(...args: string[]): void {
    const message = this.format(...args);
    this.write({ level: 'info', message });
  }

  /**
   * Print out one or more strings at `verbose` severity.
   * @param args
   */
  public verbose(...args: string[]): void {
    const message = this.format(...args);
    this.write({ level: 'verbose', message });
  }

  /**
   * Print out one or more strings at `warn` severity.
   * @param args
   */
  public warn(...args: string[]): void {
    const message = this.format(WARN(...args));
    this.write({ level: 'warn', message });
  }

  /**
   * Print an error to the screen. If the error is of type `AbstractError` then the `toOut`
   * method will be called which can allow a user friendly message to be printed. Else, the
   * stacktrace will be printed.
   * @param error Error object to display.
   * @param exit If `false` the process will not exit after all logs have been flushed.
   * The default is `true`.
   */
  public error(error: Error, exit: boolean = true): void {
    const errString =
      error instanceof AbstractError ? error.toOut() : error.stack;
    const message = this.format(ERROR(errString));
    const cb = exit ? () => process.exit(1) : () => {};
    this.write({ level: 'error', message }, cb);
  }

  public assert(condition: boolean, message: string): void {
    if (!condition) {
      throw new AssertionError({
        message,
        stackStartFn: this.assert,
      });
    }
  }

  public start(title: string): void {
    if (this.isTiming()) {
      this.end();
      this.start(title);
    } else {
      this.startTime = Date.now();
      this.write({
        level: 'info',
        grouped: true,
        message: title,
      });
    }
  }

  public end(title: string = 'Completed'): void {
    if (this.isTiming()) {
      const duration = new Date(Date.now() - this.startTime);
      this.startTime = undefined;
      this.write({
        level: 'info',
        grouped: false,
        message: [
          title,
          `in ${duration.getUTCSeconds()}.${Math.round(
            duration.getUTCMilliseconds() / 10
          )}s`,
        ].join(' '),
      });
    }
  }

  public debug(title: string): (...args: any[]) => void {
    this.hue += GOLDEN_RATIO;
    this.hue %= 1;
    const color = Chalk.hsv(this.hue * 360, 50, 95);
    return (...args: any[]): void => {
      const message = this.format(color(`${title}:`), ...args);
      this.write({
        level: 'debug',
        message,
        pattern: title,
      });
    };
  }

  protected isTiming(): boolean {
    return this.startTime !== undefined;
  }

  protected format(...args: any[]): string {
    if (this.isTiming()) {
      return args
        .map(indentNewLines(`${EOL}${ASCII_TAB}${ASCII_TAB}`))
        .join(' ');
    }
    return args.map(indentNewLines(`${EOL}${ASCII_TAB}`)).join(' ');
  }

  protected write(
    { message, level, ...meta }: LogEntry,
    callback?: () => void
  ): boolean {
    if (this.logger.transports.length > 0) {
      return !!this.logger.log(level, message, meta, callback);
    }
    return true;
  }
}
