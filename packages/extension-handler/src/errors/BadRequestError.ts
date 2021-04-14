import { AbstractError } from './AbstractError';

export class BadRequestError extends AbstractError {
  public static CODE = 'BAD_REQUEST';
  public static STATUS = 400;
  public constructor(description: string) {
    super({
      code: BadRequestError.CODE,
      httpStatus: BadRequestError.STATUS,
      description,
    });
  }
}
