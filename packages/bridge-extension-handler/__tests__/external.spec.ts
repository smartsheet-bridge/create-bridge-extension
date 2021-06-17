import {
  BadRequestError,
  ExtensionStatus,
  NotFoundError,
} from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../src';
import { ExternalPayload } from '../src/handlers/handleExternals';
import { Caller } from '../src/models/Caller';
import { ChannelOutput } from '../src/models/ChannelOutput';
import { HttpResponse } from '../src/models/HttpResponse';
import { TextChannelMessage } from '../src/models/TextChannelMessage';
import { WorkflowChannelMessage } from '../src/models/WorkflowChannelMessage';
import { ExternalResponse } from '../src/responses/ExternalResponse';
import { serve } from './express';

describe('integration tests - external', () => {
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

  const PAYLOAD: ExternalPayload = {
    event: 'EXTERNAL_CALL',
    caller: CALLER,
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
          caller: CALLER,
          settings: {
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
          caller: CALLER,
          settings: {
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
    [
      'none',
      {},
      {
        status: ExtensionStatus.SUCCESS,
        httpResponse: { httpStatus: 200 },
        channelOutput: [],
      },
    ],
    [
      'comments',
      {
        comments: ['one', 'two'],
      },
      {
        status: ExtensionStatus.SUCCESS,
        httpResponse: { httpStatus: 200 },
        channelOutput: [
          {
            channelMessage: { uid: '0', text: 'one' },
          },
          {
            channelMessage: { uid: '1', text: 'two' },
          },
        ],
      },
    ],
    [
      'triggers',
      {
        triggers: [
          {
            uid: 'UUID',
            workflow: 'ping',
          },
        ],
      },
      {
        status: ExtensionStatus.SUCCESS,
        httpResponse: { httpStatus: 200 },
        channelOutput: [
          {
            channelMessage: {
              uid: 'UUID',
              conversation: {
                new: 'ping',
              },
            },
          },
        ],
      },
    ],
  ] as Array<[string, any, any]>)(
    'triggers response %s',
    async (type, bodyData, expectedResult) => {
      const mockFn = jest.fn(() => {
        const response = ExternalResponse.create();

        response.setHTTPResponse(HttpResponse.create({ httpStatus: 200 }));
        response.setStatus(ExtensionStatus.SUCCESS);

        const channelOutput = [];

        if (bodyData.comments) {
          bodyData.comments.forEach((text, index) => {
            const output = ChannelOutput.create({});
            const channelMessage = TextChannelMessage.create();
            channelMessage.setUid(`${index}`);
            channelMessage.setText(text);
            output.setChannelMessage(channelMessage);
            channelOutput.push(output);
          });
        }

        if (bodyData.triggers) {
          bodyData.triggers.forEach(trigger => {
            const channelMessage = WorkflowChannelMessage.create();
            channelMessage.setUid(trigger.uid);
            channelMessage.setWorkflow(trigger.workflow);
            channelOutput.push(ChannelOutput.create({ channelMessage }));
          });
        }

        response.setChannelOutput(channelOutput);

        return response;
      });
      const handler = createBridgeHandler({
        externals: {
          abc: mockFn,
        },
      });
      const functionPayload = { ...PAYLOAD };
      functionPayload.payload.bodyData = bodyData;
      const res = await serve(handler).post('/').send(functionPayload);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          ...bodyData,
        },
        {
          caller: CALLER,
          settings: {
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
