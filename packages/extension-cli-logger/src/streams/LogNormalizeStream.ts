import { Transform, TransformCallback } from 'stream';
import { LogStreamChunk } from '../Logger';

export class LogNormalizeStream extends Transform {
  public constructor() {
    super({
      objectMode: true,
    });
  }

  public _transform(
    chunkOrString: LogStreamChunk | string,
    encoding: string,
    next: TransformCallback
  ): void {
    const chunk =
      typeof chunkOrString === 'string'
        ? { message: chunkOrString }
        : chunkOrString;

    return next(null, chunk);
  }
}
