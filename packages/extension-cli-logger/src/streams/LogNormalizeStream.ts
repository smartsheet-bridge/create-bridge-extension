import { Transform, TransformCallback } from 'stream';
import { LogStreamChunk } from '../Logger';

export class LogNormalizeStream extends Transform {
  public constructor() {
    super({
      objectMode: true,
    });
  }

  public _transform(
    chunk: LogStreamChunk | string,
    encoding: string,
    next: TransformCallback
  ): void {
    if (typeof chunk === 'string') {
      chunk = {
        message: chunk,
      };
    }
    return next(null, chunk);
  }
}
