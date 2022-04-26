import { maskKey } from './utils';

describe('utils', () => {
  describe('maskKey', () => {
    it.each([
      ['1', '1'],
      ['12', '12'],
      ['123', '123'],
      ['1234', '1234'],
      ['a1234', '*1234'],
      ['ab1234', '**1234'],
      ['abc1234', '***1234'],
      ['abcd1234', '****1234'],
      ['abcde1234', '*****1234'],
    ])('mask key %s to %s', (input, expected) => {
      expect(maskKey(input)).toBe(expected);
    });
  });
});
