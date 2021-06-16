import {
  BadRequestError,
  createExtensionHandler,
} from '@smartsheet-extensions/handler';
import { BadHandleOAuth2CodeResponseError } from '../errors/BadHandleOAuth2CodeResponseError';
import { OAuth2Data } from '../models/OAuth2Data';
import { OAuthType } from '../models/OAuthType';
import { HandleOAuth2CodeResponse } from '../responses/HandleOAuth2CodeResponse';
import {
  HandleOAuth2CodeConfig,
  HandleOAuth2CodePayload,
  handleOAuth2HandleCode,
} from './handleOAuth2HandleCode';

describe('handleHandleOAuth2Code - onOAuthHandleCode', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const CALLBACK = jest.fn();

  const PAYLOAD: HandleOAuth2CodePayload = {
    event: 'OAUTH2_HANDLE_CODE',
    payload: {
      oauthType: OAuthType.Provider,
      redirectURI: 'api.bridge.smartsheet.com/oauth2/callback',
      registrationData: {},
      code: 'CODE',
      scope: '',
      state: '',
    },
  };

  it.each([
    HandleOAuth2CodeResponse.create({
      access_token: 'TOKEN',
      refresh_token: 'REFRESH',
    }),
    OAuth2Data.create({
      access_token: 'TOKEN',
      refresh_token: 'REFRESH',
    }),
    {
      access_token: 'TOKEN',
      refresh_token: 'REFRESH',
    },
  ] as any[])('returns when response is %s', async result => {
    const config: HandleOAuth2CodeConfig = {
      onOAuthHandleCode: () => result,
    };

    const handler = createExtensionHandler(handleOAuth2HandleCode(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
      ...result,
    });
  });

  it('throws error if user throws error', async () => {
    const error = new Error('test error');
    const config: HandleOAuth2CodeConfig = {
      onOAuthHandleCode: () => {
        throw error;
      },
    };

    const handler = createExtensionHandler(handleOAuth2HandleCode(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(error);
  });
  it('failed when response is void', async () => {
    const config: HandleOAuth2CodeConfig = {
      onOAuthHandleCode: () => {},
    };

    const handler = createExtensionHandler(handleOAuth2HandleCode(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadHandleOAuth2CodeResponseError('undefined')
    );
  });
  it('failed when response is non-data object', async () => {
    const config: HandleOAuth2CodeConfig = {
      onOAuthHandleCode: () => {
        return {};
      },
    };

    const handler = createExtensionHandler(handleOAuth2HandleCode(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadHandleOAuth2CodeResponseError('object')
    );
  });
  it('failed when response is null', async () => {
    const config: HandleOAuth2CodeConfig = {
      onOAuthHandleCode: () => {
        return null;
      },
    };

    const handler = createExtensionHandler(handleOAuth2HandleCode(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadHandleOAuth2CodeResponseError('null')
    );
  });

  it('failed when payload is invalid', async () => {
    const config: HandleOAuth2CodeConfig = {
      onOAuthHandleCode: () => {
        return null;
      },
    };

    const handler = createExtensionHandler(handleOAuth2HandleCode(config));
    expect(() => handler({}, CALLBACK)).toThrowError(
      new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      )
    );
  });
});
