import { createExtensionHandler } from '../handler';
import { handleThunks } from './handleThunks';

describe('Thunk Enhancer', () => {
  const META = { registrationData: { hello: 'hello' } };
  const PARAMS = { world: 'world' };
  const RESULT = { meta: META, params: PARAMS };

  it('should handle a primitive response', done => {
    const extensibleHandler = createExtensionHandler(handleThunks);
    extensibleHandler(RESULT, result => {
      expect(result).toEqual(RESULT);
      done();
    });
  });

  it('should handle a thunk response', done => {
    const test = jest.fn(respond => respond(RESULT));
    const extensibleHandler = createExtensionHandler(handleThunks);
    extensibleHandler(test, result => {
      expect(result).toEqual(RESULT);
      done();
    });
    expect(test).toBeCalledTimes(1);
  });
});
