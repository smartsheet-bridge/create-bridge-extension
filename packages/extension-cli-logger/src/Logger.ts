import { AssertionError } from 'assert';
import Chalk from 'chalk';
import { createPromptModule, DistinctQuestion } from 'inquirer';
import { EOL } from 'os';
import { PassThrough, Readable, Writable } from 'stream';
import { WriteStream } from 'tty';
import * as Util from 'util';
import { AbstractError } from './errors/AbstractError';

export enum LogLevel {
  SILENT = 0,
  ERROR = 10,
  WARN = 20,
  INFO = 30,
  VERBOSE = 40,
}

const indentNewLines = (replacement: string = `${EOL}${ASCII_TAB} `) => (
  arg: any
) => {
  return Util.formatWithOptions(
    { colors: true, compact: false, breakLength: Infinity, depth: 7 },
    arg
  ).replace(new RegExp(EOL, 'g'), replacement);
};

const ASCII_TAB: string = '  ';
const ASCII_ARROW: string = '➤';
const ASCII_ERROR: string = '‼︎';
const ASCII_WARN: string = '!';
const ASCII_BOX_TOP: string = '┌';
const ASCII_BOX_MIDDLE: string = '│';
const ASCII_BOX_BOTTOM: string = '└';
const ASCII_PROMPT: string = '?';
const ASCII_SUCCESS: string = '✔️';
const GOLDEN_RATIO: number = 0.618033988749895;
const ERROR = Chalk.hex('#E57373');
const WARN = Chalk.hex('#FFF176');

export type ReadWritable = Readable & Writable;

export interface LogStreamChunk {
  filter?: LogLevel;
  pattern?: string;
  message: any;
}

export class Logger {
  private hue: number = Math.random();

  private out: ReadWritable;
  private err: ReadWritable;
  private startTime: number | undefined;

  public constructor() {
    this.out = new PassThrough({ objectMode: true });
    this.err = new PassThrough({ objectMode: true });
  }

  public addOut(...streams: Writable[]): void {
    streams.reduce((out, stream) => out.pipe(stream), this.out);
  }

  public addErr(...streams: Writable[]): void {
    streams.reduce((err, stream) => err.pipe(stream), this.err);
  }

  public info(...args: string[]): void {
    const msg = this.format(Chalk.blue(ASCII_ARROW), ...args);
    this.write(this.out, msg + EOL, LogLevel.INFO);
  }

  public verbose(...args: string[]): void {
    const msg = this.format(Chalk.blue(ASCII_ARROW), ...args);
    this.write(this.out, msg + EOL, LogLevel.VERBOSE);
  }

  public warn(...args: string[]): void {
    const msg = this.format(WARN(ASCII_WARN), WARN(...args));
    this.write(this.err, msg + EOL, LogLevel.WARN);
  }

  public error(error: Error): void {
    const errString =
      error instanceof AbstractError ? error.toOut() : error.stack;
    const msg = this.format(ERROR(ASCII_ERROR), ERROR(errString));
    this.write(this.err, msg + EOL, LogLevel.ERROR);
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
      this.write(
        this.out,
        [Chalk.blue(ASCII_ARROW), ASCII_BOX_TOP, title, EOL].join(' '),
        LogLevel.INFO
      );
    }
  }

  public end(title: string = 'Completed'): void {
    if (this.isTiming()) {
      const duration = new Date(Date.now() - this.startTime);
      this.startTime = undefined;
      this.write(
        this.out,
        [
          Chalk.blue(ASCII_ARROW),
          ASCII_BOX_BOTTOM,
          title,
          `in ${duration.getUTCSeconds()}.${Math.round(
            duration.getUTCMilliseconds() / 10
          )}s`,
          EOL,
        ].join(' '),
        LogLevel.INFO
      );
    }
  }

  public debug(title: string): (...args: any[]) => void {
    this.hue += GOLDEN_RATIO;
    this.hue %= 1;
    const color = Chalk.hsv(this.hue * 360, 50, 95);
    return (...args: any[]): void => {
      const msg = this.format(color(ASCII_ARROW), color(`${title}:`), ...args);
      this.write(this.out, msg + EOL, undefined, title);
    };
  }

  public prompt<T>(
    ...questions: ReadonlyArray<DistinctQuestion<T>>
  ): Promise<T> {
    const io = new PassThrough({ objectMode: true });
    io.pipe(this.out, { end: false });
    const prompt = createPromptModule({
      output: (io as unknown) as WriteStream,
      input: process.stdin,
    });
    return prompt<T>(
      questions.map(q => {
        return {
          ...q,
          prefix: this.isTiming()
            ? `${Chalk.green(ASCII_PROMPT)} ${ASCII_BOX_MIDDLE}`
            : Chalk.green(ASCII_PROMPT),
          stdout: this.out,
        };
      })
    );
  }

  protected isTiming(): boolean {
    return this.startTime !== undefined;
  }

  protected format(prefix: string, ...args: any[]): string {
    if (this.isTiming()) {
      return [
        prefix,
        ASCII_BOX_MIDDLE,
        ...args.map(indentNewLines(`${EOL}${ASCII_TAB}${ASCII_TAB}`)),
      ].join(' ');
    } else {
      return [prefix, ...args.map(indentNewLines(`${EOL}${ASCII_TAB}`))].join(
        ' '
      );
    }
  }

  protected write(
    stream: Writable,
    message: any,
    filter?: LogLevel,
    pattern?: string
  ): boolean {
    const data: LogStreamChunk = {
      message,
      filter,
      pattern,
    };
    return stream.write(data);
  }
}
