export interface ResponseError {
  code: string;
  description: string;
  httpStatus: number;
}

export abstract class AbstractError extends Error {
  private httpStatus: number;
  public constructor({ code, description, httpStatus }: ResponseError) {
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

  public toJSON(): ResponseError {
    return {
      code: this.name,
      httpStatus: this.httpStatus,
      description: this.message,
    };
  }
}
