import * as Util from 'util';
import { LogLevel } from './';

const ANSI_CLEAR_LINE = '[2K[1G'; // NOT A SPACE CHARACTER BTW

const loglevelFromString = (str: string): LogLevel => {
  if (str && str !== '') {
    return LogLevel[str.toUpperCase() as keyof typeof LogLevel];
  }
};

export interface LoggerOutConfig {
  stream: NodeJS.WritableStream;
  loglevel?: LogLevel | string;
  filter?: RegExp | string;
}

export class LoggerOut {
  private stream: NodeJS.WritableStream;
  private loglevel: LogLevel = LogLevel.INFO;
  private filter: RegExp;

  public constructor({ stream, loglevel, filter }: LoggerOutConfig) {
    this.stream = stream;
    this.setLevel(loglevel);
    this.setFilter(filter);
  }

  public isLoggable(target: LogLevel): boolean {
    return target <= this.loglevel;
  }

  public isDebuggable(target: string): boolean {
    return this.filter && this.filter.test(target);
  }

  public write(str: string): void {
    this.stream.write(
      Util.formatWithOptions(
        { colors: true, compact: false, breakLength: Infinity, depth: 7 },
        str
      )
    );
  }

  private setLevel(target: LogLevel | string): void {
    if (typeof target === 'string') {
      this.loglevel = loglevelFromString(target) || this.loglevel;
    } else {
      this.loglevel = target;
    }
  }

  private setFilter(regex?: RegExp | string): void {
    if (typeof regex === 'string') {
      this.filter = new RegExp(regex);
    } else if (regex !== undefined) {
      this.filter = regex;
    } else {
      this.filter = undefined;
    }
  }
}
