export abstract class AbstractError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public toOut(): string {
    return this.stack;
  }

  public toErr(): string {
    return this.stack;
  }
}
