import { createExtensionHandler } from '../handler';
import { handlePromises } from './handlePromises';

describe('Promise Enhancer', () => {
  const META = { registrationData: { hello: 'hello' } };
  const PARAMS = { world: 'world' };
  const RESULT = { meta: META, params: PARAMS };

  it('should handle a primitive response', done => {
    const extensibleHandler = createExtensionHandler(handlePromises);
    extensibleHandler(RESULT, (err, result) => {
      expect(result).toEqual(RESULT);
      done();
    });
  });

  it('should handle a promise response', done => {
    const extensibleHandler = createExtensionHandler(handlePromises);
    extensibleHandler(Promise.resolve(RESULT), (err, result) => {
      expect(result).toEqual(RESULT);
      done();
    });
  });

  it('should handle a async/await response', done => {
    const promiseFn = async (params, meta) => {
      const result = await Promise.resolve({ params, meta });
      return result;
    };
    const extensibleHandler = createExtensionHandler(handlePromises);
    extensibleHandler(promiseFn(PARAMS, META), (err, result) => {
      expect(result).toEqual(RESULT);
      done();
    });
  });

  it('should handle a rejected promise response', done => {
    const extensibleHandler = createExtensionHandler(handlePromises);
    const expectedError = new Error('some error');
    extensibleHandler(Promise.reject(expectedError), err => {
      expect(err).toEqual(expectedError);
      done();
    });
  });
});
