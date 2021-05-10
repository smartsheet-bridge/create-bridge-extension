import { regexp } from './regexp';

describe('regexp', () => {
  it.each([
    [undefined, undefined],
    ['^test', undefined],
    ['^test', 'test'],
    [new RegExp(/^test/), undefined],
    [new RegExp(/^test/), 'test'],
  ] as Array<[string | RegExp | undefined, string | undefined]>)(
    'allows messages with filter %s and pattern %s',
    (optsPattern, messagePattern) => {
      const entry = {
        level: 'info',
        message: 'hello',
        pattern: messagePattern,
      };
      expect(regexp().transform(entry, { pattern: optsPattern })).toBe(entry);
    }
  );
  it.each([
    [undefined, 'test'],
    ['^test', 'aTest'],
    [new RegExp(/^test/, 'gi'), 'aTest'],
  ] as Array<[string | RegExp | undefined, string | undefined]>)(
    'does not allow messages with filter %s and pattern %s',
    (optsPattern, messagePattern) => {
      const entry = {
        level: 'info',
        message: 'hello',
        pattern: messagePattern,
      };
      expect(regexp().transform(entry, { pattern: optsPattern })).toBe(false);
    }
  );
});
