import {
  compose,
  createExtensionHandler,
  DefaultExtensionHandler,
  ExtensionError,
  ExtensionHandlerEnhancer,
  ExtensionHandlerEnhancerCreate,
  handlePromises,
  handleThunks,
  httpTransport,
} from '../src';
import { serve } from './express';

const SOME_ERROR = new Error('some error');

describe('integration tests - error handling', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(global.console, 'error').mockImplementation();
  });

  const testEnhancer = (
    fn: () => any
  ): ExtensionHandlerEnhancer => create => () => {
    const next = create();
    return (payload, callback) => {
      next(fn(), callback);
    };
  };

  it('should return 200 ok', async done => {
    const handler = createExtensionHandler(httpTransport);
    const res = await serve(handler).post('/').send();
    expect(res.status).toBe(200);
    done();
  });

  it('should return 200 ok', async done => {
    const enhancer = compose(httpTransport, handleThunks, handlePromises);
    const handler = createExtensionHandler(enhancer);
    const res = await serve(handler).post('/').send();
    expect(res.status).toBe(200);
    done();
  });

  it.each([
    () => () => {
      throw SOME_ERROR;
    },
    () => (payload, callback) => {
      callback(SOME_ERROR);
    },
    create => (payload, callback) => {
      const next = create();
      next(Promise.reject(SOME_ERROR), callback);
    },
  ] as Array<(create: ExtensionHandlerEnhancerCreate) => DefaultExtensionHandler>)(
    'should return 200 ok with error objects',
    async fn => {
      const buggyEnhancer: ExtensionHandlerEnhancer = create => () => {
        return fn(create);
      };
      const enhancer = compose(
        httpTransport,
        buggyEnhancer,
        handleThunks,
        handlePromises
      );
      const handler = createExtensionHandler(enhancer);
      const res = await serve(handler).post('/').send();

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 1,
        error: {
          code: ExtensionError.CODE,
          description: 'some error',
          httpStatus: 500,
        },
      });
    }
  );

  it.each([
    [
      'SYNC',
      () => {
        throw SOME_ERROR;
      },
    ],
    [
      'THUNK',
      () => () => {
        throw SOME_ERROR;
      },
    ],
    ['PROMISE', () => Promise.reject(SOME_ERROR)],
    [
      'PROMISE TIMEOUT',
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(SOME_ERROR);
          }, 1);
        }),
    ],
    [
      'THUNK PROMISE TIMEOUT',
      () => respond =>
        respond(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(SOME_ERROR);
            }, 1);
          })
        ),
    ],
  ] as Array<[string, () => any]>)(
    'should return 200 ok with error within %s',
    async (type, fn) => {
      const enhancer = compose(
        httpTransport,
        testEnhancer(fn),
        handlePromises,
        handleThunks
      );
      const handler = createExtensionHandler(enhancer);
      const res = await serve(handler).post('/').send();

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 1,
        error: {
          code: ExtensionError.CODE,
          description: 'some error',
          httpStatus: 500,
        },
      });
    }
  );
});
