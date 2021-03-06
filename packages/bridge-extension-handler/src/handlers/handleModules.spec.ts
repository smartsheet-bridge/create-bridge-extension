import { createExtensionHandler } from '@smartsheet-extensions/handler';
import { BadModuleResponseError } from '../errors/BadModuleResponseError';
import { parseExternalChannelSettingsPayload } from '../models/ExternalChannelSettings';
import { OAuth2Data } from '../models/OAuth2Data';
import { handleModules, ModulePayload, ModulesConfig } from './handleModules';

describe('handleModule', () => {
  const PAYLOAD: ModulePayload = {
    event: 'MODULE_EXEC',
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
      moduleId: 'moduleA',
      moduleParam: {
        key: 'value',
      },
      registrationData: {},
      conversation: {},
      retryCount: 1,
      channelSetting: {
        channelName: 'not-bridge',
        threadId: 'thread',
        userId: 'user',
        runtimeCtx: { key: 'value' },
      },
      providerOAuth: OAuth2Data.create({
        access_token: 'sample_token',
      }),
    },
  };

  const CALLBACK = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    {},
    { hello: 'world' },
    { a: ['b'] },
    { a: null },
    null,
    undefined,
  ] as any[])('returns when response is %s', async result => {
    const config: ModulesConfig = {
      modules: {
        moduleA: () => result,
      },
    };
    const handler = createExtensionHandler(handleModules(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
      value: result,
    });
  });
  it.each([100, 'string', true, false, ['an', 'array']] as any[])(
    'throws error when response is %s',
    async result => {
      const config: ModulesConfig = {
        modules: {
          moduleA: () => result,
        },
      };
      const handler = createExtensionHandler(handleModules(config));
      expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
        new BadModuleResponseError('moduleA', typeof result)
      );
    }
  );
  it('throws error if user throws error', async () => {
    const error = new Error('test error');
    const config: ModulesConfig = {
      modules: {
        moduleA: () => {
          throw error;
        },
      },
    };
    const handler = createExtensionHandler(handleModules(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(error);
  });
  it('returns when response is void', async () => {
    const config: ModulesConfig = {
      modules: {
        moduleA: () => {},
      },
    };
    const handler = createExtensionHandler(handleModules(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
    });
  });

  it('payload conversion', async () => {
    const moduleFunc = jest.fn();
    const config: ModulesConfig = {
      modules: {
        moduleA: moduleFunc,
      },
    };
    const handler = createExtensionHandler(handleModules(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
    });
    const payload = {
      key: 'value',
    };
    const context = {
      caller: PAYLOAD.caller,
      channelSettings: parseExternalChannelSettingsPayload(
        PAYLOAD.payload.channelSetting,
        undefined
      ),
      oAuthData: OAuth2Data.create({ access_token: 'sample_token' }),
      retryCount: 1,
      settings: {},
      workflowRun: {
        currentState: '',
        states: {},
        threadId: '',
        workflowRunId: '',
        workspaceId: '',
      },
    };
    expect(moduleFunc).toBeCalledWith(payload, context);
  });
});
