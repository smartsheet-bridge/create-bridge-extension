import { BadRequestError, NotFoundError } from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../src';
import { ExternalPayload } from '../src/handlers/handleExternals';
import { serve } from './express';

describe('integration tests - external', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const PAYLOAD: ExternalPayload = {
    event: 'EXTERNAL_CALL',
    payload: {
      call: 'abc',
      method: 'GET',
      inboundHeaders: {},
      bodyData: {
        param1: 'param1',
        param2: 'param2',
      },
      registrationData: {
        reg1: 'reg1',
        reg2: 'reg2',
      },
    },
  };

  it('should return NOT_FOUND', async () => {
    const handler = createBridgeHandler({});
    const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedResult = new NotFoundError(
      'External function `abc` does not exist.'
    );
    const res = await serve(handler).post('/').send(PAYLOAD);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResult.toJSON());
    expect(stderr).toBeCalledTimes(1);
    expect(stderr).toBeCalledWith(expectedResult);
  });

  it('should return BAD_REQUEST', async () => {
    const handler = createBridgeHandler({});
    const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedResult = new BadRequestError(
      'Payload must contain property `call` to execute an external function.'
    );
    const {
      payload: { call, ...payload },
    } = PAYLOAD;
    const res = await serve(handler)
      .post('/')
      .send({ ...PAYLOAD, payload });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResult.toJSON());
    expect(stderr).toBeCalledTimes(1);
    expect(stderr).toBeCalledWith(expectedResult);
  });

  it.each([
    ['NUMBER', 1],
    ['STRING', 'Hello, World!'],
    ['ARRAY', [1, 2, 3]],
    ['OBJECT', { hello: 'world!' }],
  ] as Array<[string, any]>)(
    'should return %s external response',
    async (type, expectedResult) => {
      const mockFn = jest.fn(() => expectedResult);
      const handler = createBridgeHandler({
        externals: {
          abc: mockFn,
        },
      });
      const res = await serve(handler).post('/').send(PAYLOAD);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          param1: 'param1',
          param2: 'param2',
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
    'should return %s external response',
    async (type, response, expectedResult) => {
      const mockFn = jest.fn(() => response);
      const handler = createBridgeHandler({
        externals: {
          abc: mockFn,
        },
      });
      const res = await serve(handler).post('/').send(PAYLOAD);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          param1: 'param1',
          param2: 'param2',
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
