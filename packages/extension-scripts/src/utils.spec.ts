import { EnvParserError } from './errors/EnvParserError';
import {
  buildEnvironmentVariables,
  ENVMap,
  ENVPossibleInput,
  maskKey,
} from './utils';

describe('utils', () => {
  describe('buildEnvironmentVariables', () => {
    const passingTests: Array<[ENVPossibleInput, ENVMap]> = [
      [
        ['A:X', 'B:Y'],
        {
          A: 'X',
          B: 'Y',
        },
      ],
      [
        ['A :X', 'B: Y'],
        {
          A: 'X',
          B: 'Y',
        },
      ],
      [
        [{ A: 'X' }, { B: 'Y' }],
        {
          A: 'X',
          B: 'Y',
        },
      ],
      [
        ['A:X', { B: 'Y' }],
        {
          A: 'X',
          B: 'Y',
        },
      ],
      [
        {
          A: 'X',
          B: 'Y',
        },
        {
          A: 'X',
          B: 'Y',
        },
      ],
    ];
    it.each(passingTests)('parses %j to %p', (input, output) => {
      expect(buildEnvironmentVariables(input)).toEqual(output);
    });
    const throwingTests: ENVPossibleInput[][] = [[['A:']], [[':B']]];
    it.each(throwingTests)('throws error for badly formatted %j', input => {
      expect(() => buildEnvironmentVariables(input)).toThrowError(
        EnvParserError
      );
    });
  });
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
