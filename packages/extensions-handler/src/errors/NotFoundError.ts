import { AbstractError } from './AbstractError';

export class NotFoundError extends AbstractError {
  public static CODE = 'NOT_FOUND';
  public static STATUS = 404;
  public constructor(description: string) {
    super({
      code: NotFoundError.CODE,
      httpStatus: NotFoundError.STATUS,
      description,
    });
  }
}
