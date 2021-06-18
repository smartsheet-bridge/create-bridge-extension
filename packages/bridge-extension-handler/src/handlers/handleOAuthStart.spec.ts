import {
  BadRequestError,
  createExtensionHandler,
} from '@smartsheet-extensions/handler';
import { BadStartOAuth2ResponseError } from '../errors/BadStartOAuth2ResponseError';
import { OAuth2SetupData } from '../models/OAuth2SetupData';
import { OAuthType } from '../models/OAuthType';
import { StartOAuth2Response } from '../responses/StartOAuth2Response';
import {
  handleOAuth2Start,
  OAuth2StartConfig,
  StartOAuth2Payload,
} from './handleOAuthStart';

describe('handleOAuth2Start - onOAuthStart', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const CALLBACK = jest.fn();

  const PAYLOAD: StartOAuth2Payload = {
    event: 'OAUTH2_START',
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
      oauthType: OAuthType.Provider,
      redirectURI: 'api.bridge.smartsheet.com/oauth2/callback',
      registrationData: {},
    },
  };

  it.each([
    StartOAuth2Response.create({
      oauth2URI: 'third-party.com/oauth',
      clientId: 'clientID',
    }),
    OAuth2SetupData.create({
      oauth2URI: 'third-party.com/oauth',
      clientId: 'clientID',
    }),
    {
      oauth2URI: 'third-party.com/oauth',
      clientId: 'clientID',
    },
  ] as any[])('returns when response is %s', async result => {
    const config: OAuth2StartConfig = {
      onOAuthStart: () => result,
    };

    const handler = createExtensionHandler(handleOAuth2Start(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
      ...result,
    });
  });

  it('throws error if user throws error', async () => {
    const error = new Error('test error');
    const config: OAuth2StartConfig = {
      onOAuthStart: () => {
        throw error;
      },
    };

    const handler = createExtensionHandler(handleOAuth2Start(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(error);
  });
  it('failed when response is void', async () => {
    const config: OAuth2StartConfig = {
      onOAuthStart: () => {},
    };

    const handler = createExtensionHandler(handleOAuth2Start(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadStartOAuth2ResponseError('undefined')
    );
  });
  it('failed when response is non-data object', async () => {
    const config: OAuth2StartConfig = {
      onOAuthStart: () => {
        return {};
      },
    };

    const handler = createExtensionHandler(handleOAuth2Start(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadStartOAuth2ResponseError('object')
    );
  });
  it('failed when response is null', async () => {
    const config: OAuth2StartConfig = {
      onOAuthStart: () => {
        return null;
      },
    };

    const handler = createExtensionHandler(handleOAuth2Start(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadStartOAuth2ResponseError('null')
    );
  });

  it('failed when payload is invalid', async () => {
    const config: OAuth2StartConfig = {
      onOAuthStart: () => {
        return null;
      },
    };

    const handler = createExtensionHandler(handleOAuth2Start(config));
    expect(() => handler({}, CALLBACK)).toThrowError(
      new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      )
    );
  });
});
