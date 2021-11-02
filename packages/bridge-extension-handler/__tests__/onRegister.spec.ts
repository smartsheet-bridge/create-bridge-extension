import { createBridgeHandler } from '../src';
import { BadRegisterResponseError } from '../src/errors/BadRegisterResponseError';
import { RegisterPayload } from '../src/handlers/handleRegister';
import { Caller } from '../src/models/Caller';
import { WorkflowTriggerSpec } from '../src/models/WorkflowTriggerSpec';
import { RegisterResponse } from '../src/responses/RegisterResponse';
import { serve } from './express';

describe('integration tests - onRegister', () => {
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

  const SETTINGS = {
    reg1: 'reg1',
    reg2: 'reg2',
  };

  const RESPONSE = {
    settings: SETTINGS,
    workflowTriggers: [
      WorkflowTriggerSpec.create({ workflowID: 'workflowUUID' }),
    ],
  };

  const SERIALIZED_RESPONSE = RegisterResponse.create(
    RESPONSE
  ).toSerializableObject();

  const BODY: RegisterPayload = {
    event: 'PLUGIN_REGISTER',
    caller: CALLER,
    payload: {
      registrationData: SETTINGS,
      inboundURI: 'https://api.bridge.smartsheet.com/v2/inbound',
    },
  };

  it('should return SUCCESS', async () => {
    const handler = createBridgeHandler({});
    await serve(handler)(BODY);
  });

  it('should return SUCCESS with no registrationData given', async () => {
    const mockFn = jest.fn(() => ({ settings: {} }));
    const handler = createBridgeHandler({ onRegister: mockFn });
    await serve(handler)({
      event: 'PLUGIN_REGISTER',
      payload: {},
    });
  });

  it('should return SUCCESS with no registrationData given', async () => {
    const mockFn = jest.fn(() => ({ settings: {} }));
    const handler = createBridgeHandler({ onRegister: mockFn });
    await serve(handler)({
      event: 'PLUGIN_REGISTER',
    });
  });

  it.each([
    ['UNDEFINED', undefined, 'undefined'],
    ['NULL', null, 'null'],
    ['NUMBER', 1, 'number'],
    ['STRING', 'Hello, World!', 'string'],
    ['ARRAY', [1, 2, 3], 'object'],
    ['THUNK', respond => respond('hello'), 'string'],
    ['PROMISE', Promise.resolve('hello'), 'string'],
    ['PROMISE UNDEFINED', Promise.resolve(), 'undefined'],
    ['THUNK UNDEFINED', respond => respond(), 'undefined'],
  ] as Array<[string, any, any?]>)(
    'should return BAD_RESPONSE for %s',
    async (name, response, type) => {
      const mockFn = jest.fn(() => response);
      const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
      const expectedResult = new BadRegisterResponseError(
        type || typeof response
      );
      const handler = createBridgeHandler({
        onRegister: mockFn,
      });
      const res = await serve(handler)(BODY);
      expect(res).toEqual(expectedResult.toJSON());
      expect(stderr).toBeCalledTimes(1);
      expect(stderr).toBeCalledWith(expectedResult);
    }
  );

  it.each([
    ['INTERFACE_RESPONSE', RESPONSE, SERIALIZED_RESPONSE],
    [
      'REGISTER_RESPONSE',
      RegisterResponse.create(RESPONSE),
      SERIALIZED_RESPONSE,
    ],
    ['THUNK', respond => respond(RESPONSE), SERIALIZED_RESPONSE],
    ['PROMISE', Promise.resolve(RESPONSE), SERIALIZED_RESPONSE],
  ] as Array<[string, any, any]>)(
    'should return %s onRegister response',
    async (type, response, expectedResult) => {
      const mockFn = jest.fn(() => response);
      const handler = createBridgeHandler({
        onRegister: mockFn,
      });
      const res = await serve(handler)(BODY);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(SETTINGS, {
        caller: CALLER,
        settings: SETTINGS,
        inboundURI: 'https://api.bridge.smartsheet.com/v2/inbound',
      });
      expect(res).toEqual(expectedResult);
    }
  );
});
