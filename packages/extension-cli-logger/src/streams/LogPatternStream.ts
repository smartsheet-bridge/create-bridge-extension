import { Transform, TransformCallback } from 'stream';
import { LogStreamChunk } from '../Logger';

export class LogPatternStream extends Transform {
  private pattern: RegExp;
  public constructor(pattern?: RegExp | string) {
    super({
      objectMode: true,
    });
    this.setPattern(pattern);
  }

  public isMatch(target: string): boolean {
    return this.pattern && this.pattern.test(target);
  }

  public setPattern(regex?: RegExp | string): void {
    if (typeof regex === 'string') {
      this.pattern = new RegExp(regex);
    } else if (regex !== undefined) {
      this.pattern = regex;
    } else {
      this.pattern = undefined;
    }
  }

  public _transform(
    chunk: LogStreamChunk,
    encoding: string,
    next: TransformCallback
  ): void {
    if (!chunk.pattern || this.isMatch(chunk.pattern)) {
      return next(null, chunk);
    }
    next();
  }
}
