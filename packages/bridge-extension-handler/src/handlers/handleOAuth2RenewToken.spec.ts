import {
  BadRequestError,
  createExtensionHandler,
} from '@smartsheet-extensions/handler';
import { BadRenewOAuth2TokenResponseError } from '../errors/BadRenewOAuth2TokenResponseError';
import { OAuth2Data } from '../models/OAuth2Data';
import { OAuthType } from '../models/OAuthType';
import { RenewOAuth2TokenResponse } from '../responses/RenewOAuth2TokenResponse';
import {
  handleOAuth2RenewToken,
  OAuth2RenewTokenConfig,
  RenewOAuth2TokenPayload,
} from './handleOAuth2RenewToken';

describe('handleOAuth2RenewToken - onOAuthRenewToken', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const CALLBACK = jest.fn();

  const PAYLOAD: RenewOAuth2TokenPayload = {
    event: 'OAUTH2_RENEW_TOKEN',
    payload: {
      oauthType: OAuthType.Provider,
      redirectURI: 'api.bridge.smartsheet.com/oauth2/callback',
      registrationData: {},
      renewToken: 'REFRESH',
    },
  };

  it.each([
    RenewOAuth2TokenResponse.create({
      access_token: 'TOKEN',
      refresh_token: 'REFRESH',
    }),
    OAuth2Data.create({
      access_token: 'TOKEN',
      refresh_token: 'REFRESH',
    }),
    {
      access_token: 'TOKEN',
    },
  ] as any[])('returns when response is %s', async result => {
    const config: OAuth2RenewTokenConfig = {
      onOAuthRenewToken: () => result,
    };

    const handler = createExtensionHandler(handleOAuth2RenewToken(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
      ...result,
    });
  });

  it('throws error if user throws error', async () => {
    const error = new Error('test error');
    const config: OAuth2RenewTokenConfig = {
      onOAuthRenewToken: () => {
        throw error;
      },
    };

    const handler = createExtensionHandler(handleOAuth2RenewToken(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(error);
  });
  it('failed when response is void', async () => {
    const config: OAuth2RenewTokenConfig = {
      onOAuthRenewToken: () => {},
    };

    const handler = createExtensionHandler(handleOAuth2RenewToken(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadRenewOAuth2TokenResponseError('undefined')
    );
  });
  it('failed when response is non-data object', async () => {
    const config: OAuth2RenewTokenConfig = {
      onOAuthRenewToken: () => {
        return {};
      },
    };

    const handler = createExtensionHandler(handleOAuth2RenewToken(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadRenewOAuth2TokenResponseError('object')
    );
  });
  it('failed when response is null', async () => {
    const config: OAuth2RenewTokenConfig = {
      onOAuthRenewToken: () => {
        return null;
      },
    };

    const handler = createExtensionHandler(handleOAuth2RenewToken(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
      new BadRenewOAuth2TokenResponseError('null')
    );
  });

  it('failed when payload is invalid', async () => {
    const config: OAuth2RenewTokenConfig = {
      onOAuthRenewToken: () => {
        return null;
      },
    };

    const handler = createExtensionHandler(handleOAuth2RenewToken(config));
    expect(() => handler({}, CALLBACK)).toThrowError(
      new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      )
    );
  });
});
