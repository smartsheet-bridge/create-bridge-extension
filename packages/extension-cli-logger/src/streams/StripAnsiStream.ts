import { Transform, TransformCallback } from 'stream';
import stripAnsi from 'strip-ansi';
import { LogStreamChunk } from '../Logger';

export class StripAnsiStream extends Transform {
  public constructor() {
    super({
      objectMode: true,
    });
  }

  public _transform(
    chunk: LogStreamChunk,
    encoding: string,
    next: TransformCallback
  ): void {
    return next(null, { ...chunk, message: stripAnsi(chunk.message) });
  }
}
