import { BadRequestError } from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../src';
import { BadRenewOAuth2TokenResponseError } from '../src/errors/BadRenewOAuth2TokenResponseError';
import { RenewOAuth2TokenPayload } from '../src/handlers/handleOAuth2RenewToken';
import { Caller } from '../src/models/Caller';
import { OAuth2Data } from '../src/models/OAuth2Data';
import { OAuthType } from '../src/models/OAuthType';
import { HandleOAuth2CodeResponse } from '../src/responses/HandleOAuth2CodeResponse';
import { serve } from './express';

describe('integration tests - onOAuthRenewToken', () => {
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
    access_token: 'TOKEN',
    refresh_token: 'REFRESH',
  };

  const SERIALIZED_RESPONSE = {
    status: 0,
    oauth2Token: {
      access_token: 'TOKEN',
      refresh_token: 'REFRESH',
    },
  };

  const BODY: RenewOAuth2TokenPayload = {
    event: 'OAUTH2_RENEW_TOKEN',
    caller: CALLER,
    payload: {
      renewToken: 'REFRESH',
      oauthType: OAuthType.Provider,
      redirectURI: 'example.com/redirect',
      registrationData: SETTINGS,
    },
  };

  it('undefined function should throw error', async () => {
    const expectedError = new BadRequestError(
      'onOAuthRenewToken function has not been defined'
    );

    const handler = createBridgeHandler({});
    const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const res = await serve(handler)(BODY);
    expect(res).toEqual(expectedError.toJSON());
    expect(stderr).toBeCalledTimes(1);
    expect(stderr).toBeCalledWith(expectedError);
  });

  it('should return SUCCESS with no payload', async () => {
    const mockFn = jest.fn(() => RESPONSE);
    const handler = createBridgeHandler({ onOAuthRenewToken: mockFn });
    await serve(handler)({
      event: 'OAUTH2_RENEW_TOKEN',
      payload: {},
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
      const expectedResult = new BadRenewOAuth2TokenResponseError(
        type || typeof response
      );
      const handler = createBridgeHandler({
        onOAuthRenewToken: mockFn,
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
      'HANDLE_OAUTH_RESPONSE',
      HandleOAuth2CodeResponse.create(RESPONSE),
      SERIALIZED_RESPONSE,
    ],
    ['OAUTH2_DATA_RESPONSE', OAuth2Data.create(RESPONSE), SERIALIZED_RESPONSE],
    ['THUNK', respond => respond(RESPONSE), SERIALIZED_RESPONSE],
    ['PROMISE', Promise.resolve(RESPONSE), SERIALIZED_RESPONSE],
  ] as Array<[string, any, any]>)(
    'should return %s onOAuthRenewToken response',
    async (type, response, expectedResult) => {
      const mockFn = jest.fn(() => response);
      const handler = createBridgeHandler({
        onOAuthRenewToken: mockFn,
      });
      const res = await serve(handler)(BODY);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          renewToken: 'REFRESH',
          oauthType: OAuthType.Provider,
        },
        {
          caller: CALLER,
          redirectURI: 'example.com/redirect',
          settings: SETTINGS,
        }
      );
      expect(res).toEqual(expectedResult);
    }
  );
});
