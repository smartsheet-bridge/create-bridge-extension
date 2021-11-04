import { BadRequestError, NotFoundError } from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../src';
import { BadModuleResponseError } from '../src/errors/BadModuleResponseError';
import { ModulePayload } from '../src/handlers/handleModules';
import { Caller } from '../src/models/Caller';
import { ModuleResponse } from '../src/responses/ModuleResponse';
import { serve } from './express';

describe('integration tests - module', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const CALLER: Caller = {
    callTime: 0,
    callToken: {
      signature: '',
      validUntil: 0,
    },
    installUUID: '',
    invoker: {
      userUUID: '',
    },
    msgid: '',
    pluginUUID: '',
    provider: {
      providerDomain: '',
      providerUUID: '',
      workspaceUUID: '',
    },
    revision: '',
  };

  const PAYLOAD: ModulePayload = {
    event: 'MODULE_EXEC',
    caller: CALLER,
    payload: {
      moduleId: 'abc',
      moduleParam: {
        param1: 'param1',
        param2: 'param2',
      },
      registrationData: {
        reg1: 'reg1',
        reg2: 'reg2',
      },
      conversation: {
        conversationUUID: 'runUUID',
        requestUUID: 'threadUUID',
      },
      retryCount: 1,
      channelSetting: {
        channelName: 'not-bridge',
        threadId: 'thread',
        userId: 'user',
        runtimeCtx: { key: 'value' },
      },
    },
  };

  it('should return NOT_FOUND', async () => {
    const handler = createBridgeHandler({});
    const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedResult = new NotFoundError('Module `abc` does not exist.');
    const res = await serve(handler)(PAYLOAD);
    expect(res).toEqual(expectedResult.toJSON());
    expect(stderr).toBeCalledTimes(1);
    expect(stderr).toBeCalledWith(expectedResult);
  });

  it('should return BAD_REQUEST', async () => {
    const handler = createBridgeHandler({});
    const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const expectedResult = new BadRequestError(
      'Payload must contain property `moduleId` to execute a module.'
    );
    const {
      payload: { moduleId, ...payload },
    } = PAYLOAD;
    const res = await serve(handler)({ ...PAYLOAD, payload });
    expect(res).toEqual(expectedResult.toJSON());
    expect(stderr).toBeCalledTimes(1);
    expect(stderr).toBeCalledWith(expectedResult);
  });

  it.each([
    ['NUMBER', 1, 'number'],
    ['STRING', 'Hello, World!', 'string'],
    ['ARRAY', [1, 2, 3], 'object'],
    ['THUNK', respond => respond('hello'), 'string'],
    ['PROMISE', Promise.resolve('hello'), 'string'],
  ] as Array<[string, any, any?]>)(
    'should return BAD_RESPONSE for %s',
    async (name, response, type) => {
      const mockFn = jest.fn(() => response);
      const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
      const expectedResult = new BadModuleResponseError(
        'abc',
        type || typeof response
      );
      const handler = createBridgeHandler({
        modules: {
          abc: mockFn,
        },
      });
      const res = await serve(handler)(PAYLOAD);
      expect(res).toEqual(expectedResult.toJSON());
      expect(stderr).toBeCalledTimes(1);
      expect(stderr).toBeCalledWith(expectedResult);
    }
  );

  it.each([
    [
      'MODULE_RESPONSE',
      ModuleResponse.create({ value: { result: 0 }, exit: 'hello' }),
      ModuleResponse.create({ value: { result: 0 }, exit: 'hello' }),
    ],
    ['NUMBER', { result: 1 }, ModuleResponse.create({ value: { result: 1 } })],
    [
      'STRING',
      { result: 'Hello, World!' },
      ModuleResponse.create({ value: { result: 'Hello, World!' } }),
    ],
    [
      'ARRAY',
      { result: [1, 2, 3] },
      ModuleResponse.create({ value: { result: [1, 2, 3] } }),
    ],
    [
      'OBJECT',
      { hello: 'world!' },
      ModuleResponse.create({ value: { hello: 'world!' } }),
    ],
    [
      'NESTED OBJECT',
      { result: { hello: 'world!' } },
      ModuleResponse.create({ value: { result: { hello: 'world!' } } }),
    ],
    ['UNDEFINED', undefined, ModuleResponse.create()],
    [
      'THUNK',
      respond => respond({ result: 'Hello, World!' }),
      ModuleResponse.create({ value: { result: 'Hello, World!' } }),
    ],
    [
      'PROMISE',
      Promise.resolve({ result: 'Hello, World!' }),
      ModuleResponse.create({ value: { result: 'Hello, World!' } }),
    ],
    ['PROMISE UNDEFINED', Promise.resolve(), ModuleResponse.create()],
    ['THUNK UNDEFINED', respond => respond(), ModuleResponse.create()],
    [
      'THUNK MODULE_RESPONSE',
      respond =>
        respond(ModuleResponse.create({ value: { result: 'Hello, World!' } })),
      ModuleResponse.create({ value: { result: 'Hello, World!' } }),
    ],
    [
      'PROMISE MODULE_RESPONSE',
      Promise.resolve(
        ModuleResponse.create({ value: { result: 'Hello, World!' } })
      ),
      ModuleResponse.create({ value: { result: 'Hello, World!' } }),
    ],
    [
      'THUNK > PROMISE',
      respond => respond(Promise.resolve({ result: 'Hello, World!' })),
      ModuleResponse.create({ value: { result: 'Hello, World!' } }),
    ],
    [
      'PROMISE > PROMISE',
      Promise.resolve(Promise.resolve({ result: 'Hello, World!' })),
      ModuleResponse.create({ value: { result: 'Hello, World!' } }),
    ],
  ] as Array<[string, any, any]>)(
    'should return %s module response',
    async (type, response, expectedResult) => {
      const mockFn = jest.fn(() => response);
      const handler = createBridgeHandler({
        modules: {
          abc: mockFn,
        },
      });
      const res = await serve(handler)(PAYLOAD);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          param1: 'param1',
          param2: 'param2',
        },
        {
          caller: CALLER,
          settings: {
            reg1: 'reg1',
            reg2: 'reg2',
          },
          retryCount: 1,
          workflowRun: {
            currentState: '',
            states: {},
            threadId: 'threadUUID',
            workflowRunId: 'runUUID',
            workspaceId: '',
          },
          channelSettings: {
            channelName: 'not-bridge',
            userId: 'user',
            threadId: 'thread',
            runtimeData: { key: 'value' },
            data: undefined,
            isGroup: false,
            sync: false,
            userInfo: undefined,
          },
        }
      );
      expect(res).toEqual(expectedResult);
    }
  );
});
