import { UnregisterResponse } from './UnregisterResponse';

describe('UnregisterResponse', () => {
  describe('constructor', () => {
    const PROPS = { status: 1 };
    it('accepts when constructor given empty', () => {
      expect(new UnregisterResponse()).toEqual({
        status: 0,
      });
    });
    it('accepts when constructor given props', () => {
      expect(new UnregisterResponse(PROPS)).toEqual(PROPS);
    });
    it('accepts when static constructor given empty', () => {
      expect(UnregisterResponse.create()).toEqual({
        status: 0,
      });
    });
    it('accepts when static constructor given props', () => {
      expect(UnregisterResponse.create(PROPS)).toEqual(PROPS);
    });
  });

  describe('toSerializableObject', () => {
    const tests = [
      {
        given: {},
        expected: { status: 0 },
      },
      {
        given: { status: 1 },
        expected: { status: 1 },
      },
    ];
    tests.forEach(test => {
      it(`serializes to expected result ${test.expected}`, () => {
        expect(
          new UnregisterResponse(test.given).toSerializableObject()
        ).toEqual(test.expected);
      });
    });
  });
});
