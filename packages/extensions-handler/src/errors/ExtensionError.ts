import { ErrorResponse } from '../responses/ErrorResponse';
import { AbstractError } from './AbstractError';
import { InternalError } from './InternalError';

export class ExtensionError extends AbstractError {
  public static CODE = 'EXTENSION_ERROR';

  public static wrap(e: Error): ExtensionError {
    const error = new ExtensionError({ description: e.message });
    error.stack = `${error.stack
      .split('\n')
      .slice(0, 1)
      .join('\n')}\n${e.stack.split('\n').slice(1).join('\n')}`;
    return error;
  }

  public constructor({
    description,
    httpStatus = InternalError.STATUS,
    code = ExtensionError.CODE,
  }: Partial<Omit<ErrorResponse['error'], 'description'>> &
    Pick<ErrorResponse['error'], 'description'>) {
    super({
      code,
      httpStatus,
      description,
    });
  }
}
