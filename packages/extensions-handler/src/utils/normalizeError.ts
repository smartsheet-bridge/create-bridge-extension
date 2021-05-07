import { AbstractError } from '../errors/AbstractError';
import { ExtensionError } from '../errors/ExtensionError';
import { InternalError } from '../errors/InternalError';
import { UncaughtError } from '../errors/UncaughtError';

export const normalizeError = (e: any) => {
  if (e instanceof AbstractError) {
    return e;
  }
  if (e instanceof Error) {
    return ExtensionError.wrap(e);
  }
  if (typeof e === 'string' || e instanceof String) {
    return new UncaughtError(String(e));
  }
  if (typeof e === 'number' || e instanceof Number) {
    return new UncaughtError(`An uncaught number was thrown: ${e}`);
  }
  if (typeof e === 'boolean' || e instanceof Boolean) {
    return new UncaughtError(`An uncaught boolean was thrown: ${e}`);
  }
  return new InternalError('An unknown error has occurred.');
};
