import { createBridgeHandler } from '../src';
import { RegisterPayload } from '../src/handlers/handleRegister';
import { serve } from './express';

describe('integration tests - onRegister', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const PAYLOAD: RegisterPayload = {
    event: 'PLUGIN_REGISTER',
    payload: {
      registrationData: {
        reg1: 'reg1',
        reg2: 'reg2',
      },
    },
  };

  it('should return SUCCESS', async () => {
    const handler = createBridgeHandler({});
    const res = await serve(handler).post('/').send(PAYLOAD);
    expect(res.status).toBe(200);
  });

  it.each([
    ['NUMBER', 1],
    ['STRING', 'Hello, World!'],
    ['ARRAY', [1, 2, 3]],
    ['OBJECT', { hello: 'world!' }],
  ] as Array<[string, any]>)(
    'should return %s onRegister response',
    async (type, expectedResult) => {
      const mockFn = jest.fn(() => expectedResult);
      const handler = createBridgeHandler({
        onRegister: mockFn,
      });
      const res = await serve(handler).post('/').send(PAYLOAD);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          reg1: 'reg1',
          reg2: 'reg2',
        },
        {
          registrationData: {
            reg1: 'reg1',
            reg2: 'reg2',
          },
        }
      );
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedResult);
    }
  );

  it.each([
    ['UNDEFINED', undefined, ''],
    ['THUNK', respond => respond('Hello, World!'), 'Hello, World!'],
    ['PROMISE', Promise.resolve('Hello, World!'), 'Hello, World!'],
    ['PROMISE UNDEFINED', Promise.resolve(), ''],
    ['THUNK UNDEFINED', respond => respond(), ''],
  ] as Array<[string, any, any]>)(
    'should return %s onRegister response',
    async (type, response, expectedResult) => {
      const mockFn = jest.fn(() => response);
      const handler = createBridgeHandler({
        onRegister: mockFn,
      });
      const res = await serve(handler).post('/').send(PAYLOAD);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          reg1: 'reg1',
          reg2: 'reg2',
        },
        {
          registrationData: {
            reg1: 'reg1',
            reg2: 'reg2',
          },
        }
      );
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedResult);
    }
  );
});
