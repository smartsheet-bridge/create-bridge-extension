import { AbstractError } from './AbstractError';

export class InternalError extends AbstractError {
  public static CODE = 'INTERNAL_ERROR';
  public static STATUS = 500;
  public constructor(description: string) {
    super({
      code: InternalError.CODE,
      httpStatus: InternalError.STATUS,
      description,
    });
  }
}
