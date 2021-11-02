import {
  BadRequestError,
  ExtensionStatus,
  NotFoundError,
} from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../src';
import { BadExternalResponseError } from '../src/errors/BadExternalResponseError';
import { ExternalPayload } from '../src/handlers/handleExternals';
import { BridgeChannelSettings } from '../src/models/BridgeChannelSettings';
import { Caller } from '../src/models/Caller';
import { ChannelOutput } from '../src/models/ChannelOutput';
import { ExternalChannelSettings } from '../src/models/ExternalChannelSettings';
import { HttpResponse } from '../src/models/HttpResponse';
import { RestartWorkflowChannelMessage } from '../src/models/RestartWorkflowChannelMessage';
import { TextChannelMessage } from '../src/models/TextChannelMessage';
import { TriggerWorkflowChannelMessage } from '../src/models/TriggerWorkflowChannelMessage';
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
    const res = await serve(handler)(PAYLOAD);
    expect(res).toEqual(expectedResult.toJSON());
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
    const res = await serve(handler)({ ...PAYLOAD, payload });
    expect(res).toEqual(expectedResult.toJSON());
    expect(stderr).toBeCalledTimes(1);
    expect(stderr).toBeCalledWith(expectedResult);
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
      const expectedResult = new BadExternalResponseError(
        'abc',
        type || typeof response
      );
      const handler = createBridgeHandler({
        externals: {
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
      'none',
      {},
      {
        status: ExtensionStatus.SUCCESS,
        externalCallReturn: { httpStatus: 200 },
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
        externalCallReturn: { httpStatus: 200 },
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
            workflowId: 'ping',
          },
        ],
      },
      {
        status: ExtensionStatus.SUCCESS,
        externalCallReturn: { httpStatus: 200 },
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
            const channelMessage = TriggerWorkflowChannelMessage.create();
            channelMessage.setUid(trigger.uid);
            channelMessage.setWorkflowId(trigger.workflowId);
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
      const res = await serve(handler)(functionPayload);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          method: 'GET',
          inboundHeaders: {},
          bodyData,
        },
        {
          caller: CALLER,
          settings: {
            reg1: 'reg1',
            reg2: 'reg2',
          },
        }
      );
      expect(res).toEqual(expectedResult);
    }
  );

  it.each([
    ['empty', ExternalResponse.create(), { status: 0 }],
    [
      '200 response',
      HttpResponse.create({ httpStatus: 200 }),
      { status: 0, externalCallReturn: { httpStatus: 200 } },
    ],
    [
      'bridge-text',
      {
        channelMessage: TextChannelMessage.create({ text: 'input text' }),
        channelSetting: BridgeChannelSettings.create({
          userId: 'userUUID',
          threadId: 'requestUUID',
        }),
      },
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: { text: 'input text' },
            channelSetting: {
              userUUID: 'userUUID',
              requestUUID: 'requestUUID',
            },
          },
        ],
      },
    ],
    [
      'external-text',
      {
        channelMessage: TextChannelMessage.create({ text: 'input text' }),
        channelSetting: ExternalChannelSettings.create({
          userId: 'USER',
          threadId: 'THREAD',
        }),
      },
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: { text: 'input text' },
            channelSetting: { userId: 'USER', threadId: 'THREAD' },
          },
        ],
      },
    ],
    [
      'bridge-workflow-start',
      {
        channelMessage: TriggerWorkflowChannelMessage.create({
          workflowID: 'workflowID',
        }),
        channelSetting: BridgeChannelSettings.create({
          userId: 'userUUID',
          threadId: 'requestUUID',
        }),
      },
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: { conversation: { new: 'workflowID' } },
            channelSetting: {
              userUUID: 'userUUID',
              requestUUID: 'requestUUID',
            },
          },
        ],
      },
    ],
    [
      'external-workflow-start',
      {
        channelMessage: TriggerWorkflowChannelMessage.create({
          workflowID: 'workflowID',
        }),
        channelSetting: ExternalChannelSettings.create({
          userId: 'USER',
          threadId: 'THREAD',
        }),
      },
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: { conversation: { new: 'workflowID' } },
            channelSetting: { userId: 'USER', threadId: 'THREAD' },
          },
        ],
      },
    ],
    [
      'bridge-workflow-restart',
      {
        channelMessage: RestartWorkflowChannelMessage.create({
          workflowRunID: 'conversation',
        }),
        channelSetting: BridgeChannelSettings.create({
          userId: 'userUUID',
          threadId: 'requestUUID',
        }),
      },
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: { conversation: { existing: 'conversation' } },
            channelSetting: {
              userUUID: 'userUUID',
              requestUUID: 'requestUUID',
            },
          },
        ],
      },
    ],
    [
      'external-workflow-restart',
      {
        channelMessage: RestartWorkflowChannelMessage.create({
          workflowRunID: 'conversation',
        }),
        channelSetting: ExternalChannelSettings.create({
          userId: 'USER',
          threadId: 'THREAD',
        }),
      },
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: { conversation: { existing: 'conversation' } },
            channelSetting: { userId: 'USER', threadId: 'THREAD' },
          },
        ],
      },
    ],
    [
      'response with trigger',
      ExternalResponse.create({
        channelOutput: [
          ChannelOutput.create({
            channelSetting: ExternalChannelSettings.create({
              userId: 'USER',
              threadId: 'THREAD',
            }),
            channelMessage: TriggerWorkflowChannelMessage.create({
              workflowID: 'NEW',
            }),
          }),
        ],
      }),
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: { conversation: { new: 'NEW' } },
            channelSetting: { userId: 'USER', threadId: 'THREAD' },
          },
        ],
      },
    ],
    [
      'channel out array',
      [
        ChannelOutput.create({
          channelMessage: TriggerWorkflowChannelMessage.create({
            uid: 'bleh',
            workflowID: 'intent',
            runtimeData: {
              sheetID: 'sheetID',
              event: 'EVENT',
              isInternalUpdate: true,
            },
          }),
          channelSetting: BridgeChannelSettings.create({
            userId: 'USER UUID',
          }),
        }),
      ],
      {
        status: 0,
        channelOutput: [
          {
            channelMessage: {
              uid: 'bleh',
              conversation: {
                new: 'intent',
                runtimeCTX: {
                  sheetID: 'sheetID',
                  event: 'EVENT',
                  isInternalUpdate: true,
                },
              },
            },
            channelSetting: {
              userUUID: 'USER UUID',
            },
          },
        ],
      },
    ],
  ] as Array<[string, ExternalResponse, any]>)(
    'validate response format : %s',
    async (name, result, expected) => {
      const mockFn = jest.fn(() => {
        return result;
      });
      const handler = createBridgeHandler({
        externals: {
          abc: mockFn,
        },
      });
      const functionPayload = { ...PAYLOAD };
      const res = await serve(handler)(functionPayload);
      expect(mockFn).toBeCalledTimes(1);
      expect(res).toEqual(expected);
    }
  );
});
