import { Transform, TransformCallback } from 'stream';
import { LogStreamChunk } from '../Logger';
import { LogLevel } from '../LogLevel';

const levelFromString = (str: string): LogLevel => {
  if (str && str !== '') {
    return LogLevel[str.toUpperCase() as keyof typeof LogLevel];
  }
};

export class LogFilterStream extends Transform {
  private level: LogLevel;
  public constructor(level: LogLevel | string = LogLevel.INFO) {
    super({
      objectMode: true,
    });
    this.setLevel(level);
  }

  public isLoggable(target: LogLevel): boolean {
    return target <= this.level;
  }

  public setLevel(target: LogLevel | string): void {
    if (typeof target === 'string') {
      this.level = levelFromString(target) || this.level;
    } else {
      this.level = target;
    }
  }

  public _transform(
    chunk: LogStreamChunk,
    encoding: string,
    next: TransformCallback
  ): void {
    if (!chunk.filter || this.isLoggable(chunk.filter)) {
      next(null, chunk);
    } else {
      next();
    }
  }
}
