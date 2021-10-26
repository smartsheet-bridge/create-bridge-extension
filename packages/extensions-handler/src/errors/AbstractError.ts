import { ErrorResponse } from '../responses/ErrorResponse';
import { ExtensionStatus } from '../responses/ExtensionResponse';

export abstract class AbstractError extends Error {
  private httpStatus: number;
  public constructor({
    code,
    description,
    httpStatus,
  }: ErrorResponse['error']) {
    super(description);
    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, 'name', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: code || this.constructor.name,
    });
    Object.defineProperty(this, 'httpStatus', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: httpStatus,
    });
  }

  public toJSON(): ErrorResponse {
    return {
      status: ExtensionStatus.FAIL,
      error: {
        code: this.name,
        httpStatus: this.httpStatus,
        description: this.message,
      },
    };
  }
}
