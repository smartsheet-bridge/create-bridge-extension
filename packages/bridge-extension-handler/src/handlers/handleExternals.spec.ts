import {
  BadRequestError,
  createExtensionHandler,
} from '@smartsheet-extensions/handler';
import { BadExternalResponseError } from '../errors/BadExternalResponseError';
import { BridgeChannelSettings } from '../models/BridgeChannelSettings';
import { ChannelOutput } from '../models/ChannelOutput';
import { HttpResponse } from '../models/HttpResponse';
import { TextChannelMessage } from '../models/TextChannelMessage';
import { ExternalResponse } from '../responses/ExternalResponse';
import {
  ExternalPayload,
  ExternalsConfig,
  handleExternals,
} from './handleExternals';

describe('handleExternals', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const CALLBACK = jest.fn();

  const PAYLOAD: ExternalPayload = {
    event: 'EXTERNAL_CALL',
    caller: {
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
        providerUUID: '',
        workspaceUUID: '',
      },
      revision: '',
      instanceID: '',
    },
    payload: {
      bodyData: {},
      call: 'abc',
      inboundHeaders: {},
      method: 'POST',
      registrationData: { key: 'value' },
      queryParam: { uid: { data: ['UUID'] } },
      formData: { name: { data: ['name'] } },
    },
  };

  it.each([
    ExternalResponse.create({
      channelOutput: [
        ChannelOutput.create({
          channelSetting: BridgeChannelSettings.create(),
          channelMessage: TextChannelMessage.create({ text: 'sample text' }),
        }),
      ],
    }),
    ChannelOutput.create({
      channelSetting: BridgeChannelSettings.create(),
      channelMessage: TextChannelMessage.create({ text: 'sample text' }),
    }),
    {
      channelSetting: {},
      channelMessage: {
        text: 'sample text',
      },
    },
    [
      ChannelOutput.create({
        channelSetting: BridgeChannelSettings.create(),
        channelMessage: TextChannelMessage.create({ text: 'sample text' }),
      }),
    ],
    [
      {
        channelSetting: {},
        channelMessage: {
          text: 'sample text',
        },
      },
    ],
  ] as any[])('returns when output response is %s', async result => {
    const config: ExternalsConfig = {
      externals: {
        abc: () => result,
      },
    };

    const expected = {
      status: 0,
      channelOutput: [
        {
          channelMessage: {
            text: 'sample text',
          },
          channelSetting: {},
        },
      ],
    };

    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, expected);
  });

  it.each([
    ExternalResponse.create({
      httpResponse: HttpResponse.create({ httpStatus: 200 }),
    }),
    HttpResponse.create({ httpStatus: 200 }),
    { httpStatus: 200 },
  ] as any[])('returns when http response is %s', async result => {
    const config: ExternalsConfig = {
      externals: {
        abc: () => result,
      },
    };

    const expected = {
      status: 0,
      httpResponse: {
        httpStatus: 200,
      },
    };

    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, expected);
  });

  it('throws error if user throws error', async () => {
    const error = new Error('test error');
    const config: ExternalsConfig = {
      externals: {
        abc: () => {
          throw error;
        },
      },
    };

    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(error);
  });
  it('failed when response is void', async () => {
    const config: ExternalsConfig = {
      externals: {
        abc: () => {},
      },
    };

    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadExternalResponseError('abc', 'undefined')
    );
  });

  it('failed when response is non-data object', async () => {
    const config: ExternalsConfig = {
      externals: {
        abc: () => {
          return {};
        },
      },
    };

    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadExternalResponseError('abc', 'object')
    );
  });
  it('failed when response is null', async () => {
    const config: ExternalsConfig = {
      externals: {
        abc: () => null,
      },
    };

    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadExternalResponseError('abc', 'null')
    );
  });

  it('failed when payload is invalid', async () => {
    const config: ExternalsConfig = {
      externals: {
        abc: () => {},
      },
    };

    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler({}, CALLBACK)).toThrowError(
      new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      )
    );
  });

  it('payload conversion', async () => {
    const externalFunc = jest.fn(() => {
      return ExternalResponse.create();
    });
    const config: ExternalsConfig = {
      externals: {
        abc: externalFunc,
      },
    };
    const handler = createExtensionHandler(handleExternals(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
    });
    const payload = {
      bodyData: {},
      formData: {
        name: ['name'],
      },
      inboundHeaders: {},
      method: 'POST',
      queryParam: {
        uid: ['UUID'],
      },
    };

    const context = {
      caller: PAYLOAD.caller,
      oAuthData: undefined,
      settings: {
        key: 'value',
      },
    };
    expect(externalFunc).toBeCalledWith(payload, context);
  });
});
