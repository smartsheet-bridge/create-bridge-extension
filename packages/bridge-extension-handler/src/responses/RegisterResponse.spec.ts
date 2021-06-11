import { RegisterResponse } from './RegisterResponse';

describe('ResgisterResponse', () => {
  describe('constructor', () => {
    const PROPS = {
      status: 1,
      settings: {
        a: 'a',
      },
    };
    it('accepts when constructor given empty', () => {
      expect(new RegisterResponse()).toEqual({
        status: 0,
      });
    });
    it('accepts when constructor given props', () => {
      expect(new RegisterResponse(PROPS)).toEqual(PROPS);
    });
    it('accepts when static constructor given empty', () => {
      expect(RegisterResponse.create()).toEqual({
        status: 0,
      });
    });
    it('accepts when static constructor given props', () => {
      expect(RegisterResponse.create(PROPS)).toEqual(PROPS);
    });
  });
  describe('toSerializableObject', () => {
    const GIVEN = {
      settings: {
        a: 'a',
      },
    };
    const EXPECTED = {
      status: 0,
      registrationData: {
        a: 'a',
      },
    };
    it('serializes to expected result', () => {
      expect(new RegisterResponse(GIVEN).toSerializableObject()).toEqual(
        EXPECTED
      );
    });
  });
});
