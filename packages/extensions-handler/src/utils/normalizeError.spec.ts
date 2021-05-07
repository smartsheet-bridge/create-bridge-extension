import { ExtensionError } from '../errors/ExtensionError';
import { InternalError } from '../errors/InternalError';
import { UncaughtError } from '../errors/UncaughtError';
import { normalizeError } from './normalizeError';

describe('normalizeError', () => {
  it('returns internal error', () => {
    expect(normalizeError(undefined)).toEqual(
      new InternalError('An unknown error has occurred.')
    );
  });
  it('returns extension error', () => {
    expect(normalizeError(new Error('Hello, World!'))).toEqual(
      new ExtensionError({ description: 'Hello, World!' })
    );
  });
  it('returns instaceof AbstractErrir', () => {
    const e = new ExtensionError({ description: 'Hello, World!' });
    expect(normalizeError(e)).toBe(e);
  });
  it.each([true, false])('returns uncaught error for boolean %b', e => {
    expect(normalizeError(e)).toEqual(
      new UncaughtError(`An uncaught boolean was thrown: ${e}`)
    );
  });
  it.each([0, 1, -1, Number.MAX_VALUE, Number.MIN_VALUE])(
    'returns uncaught error for number %d',
    e => {
      expect(normalizeError(e)).toEqual(
        new UncaughtError(`An uncaught number was thrown: ${e}`)
      );
    }
  );
  it.each(['', 'Hello, World!'])('returns uncaught error for string %s', e => {
    expect(normalizeError(e)).toEqual(new UncaughtError(e));
  });
});
