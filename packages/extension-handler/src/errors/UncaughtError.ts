import { AbstractError } from './AbstractError';
import { InternalError } from './InternalError';

export class UncaughtError extends AbstractError {
  public static CODE = 'UNCAUGHT_ERROR';
  public constructor(description: string) {
    super({
      code: UncaughtError.CODE,
      httpStatus: InternalError.STATUS,
      description,
    });
  }
}
