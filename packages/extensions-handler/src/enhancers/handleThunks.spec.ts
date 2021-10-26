import { createExtensionHandler } from '../handler';
import { handleThunks } from './handleThunks';

describe('Thunk Enhancer', () => {
  const META = { registrationData: { hello: 'hello' } };
  const PARAMS = { world: 'world' };
  const RESULT = { meta: META, params: PARAMS };

  it('should handle a primitive response', done => {
    const extensibleHandler = createExtensionHandler(handleThunks);
    extensibleHandler(RESULT, (err, result) => {
      expect(result).toEqual(RESULT);
      done();
    });
  });

  it('should handle a thunk response', done => {
    const test = jest.fn(respond => respond(RESULT));
    const extensibleHandler = createExtensionHandler(handleThunks);
    extensibleHandler(test, (err, result) => {
      expect(result).toEqual(RESULT);
      done();
    });
    expect(test).toBeCalledTimes(1);
  });

  it('should bubble error in a thunk response', () => {
    const expectedError = new Error('some error');
    const test = jest.fn(() => {
      throw expectedError;
    });
    const extensibleHandler = createExtensionHandler(handleThunks);
    expect(() => extensibleHandler(test, () => {})).toThrowError(expectedError);
    expect(test).toBeCalledTimes(1);
  });
});
