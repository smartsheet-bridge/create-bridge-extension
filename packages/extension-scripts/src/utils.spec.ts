import { EnvParserError } from './errors/EnvParserError';
import { buildEnvironmentVariables, ENVMap, ENVPossibleInput } from './utils';

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
});
