import { Transform, TransformCallback } from 'stream';
import { formatWithOptions } from 'util';
import { LogStreamChunk } from '../Logger';

export class LogFormatStream extends Transform {
  public constructor() {
    super({
      readableObjectMode: false,
      writableObjectMode: true,
    });
  }

  public _transform(
    chunk: LogStreamChunk,
    encoding: string,
    next: TransformCallback
  ): void {
    const str = formatWithOptions(
      { colors: true, compact: false, breakLength: Infinity, depth: 7 },
      chunk.message
    );
    next(null, str);
  }
}
