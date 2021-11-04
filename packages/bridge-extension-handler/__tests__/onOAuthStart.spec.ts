import { BadRequestError } from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../src';
import { BadStartOAuth2ResponseError } from '../src/errors/BadStartOAuth2ResponseError';
import { StartOAuth2Payload } from '../src/handlers/handleOAuthStart';
import { Caller } from '../src/models/Caller';
import { OAuth2SetupData } from '../src/models/OAuth2SetupData';
import { OAuthType } from '../src/models/OAuthType';
import { StartOAuth2Response } from '../src/responses/StartOAuth2Response';
import { serve } from './express';

describe('integration tests - onOAuthStart', () => {
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
    clientId: 'CLIENT',
    oauth2URI: 'example.com/oauth2',
  };

  const SERIALIZED_RESPONSE = {
    status: 0,
    oauth2Setup: {
      clientId: 'CLIENT',
      oauth2URI: 'example.com/oauth2',
    },
  };

  const BODY: StartOAuth2Payload = {
    event: 'OAUTH2_START',
    caller: CALLER,
    payload: {
      oauthType: OAuthType.Provider,
      redirectURI: 'example.com/redirect',
      registrationData: SETTINGS,
    },
  };

  it('undefined function should throw error', async () => {
    const expectedError = new BadRequestError(
      'onOAuthStart function has not been defined'
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
    const handler = createBridgeHandler({ onOAuthStart: mockFn });
    await serve(handler)({
      event: 'OAUTH2_START',
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
      const expectedResult = new BadStartOAuth2ResponseError(
        type || typeof response
      );
      const handler = createBridgeHandler({
        onOAuthStart: mockFn,
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
      'START_OAUTH_RESPONSE',
      StartOAuth2Response.create(RESPONSE),
      SERIALIZED_RESPONSE,
    ],
    [
      'OAUTH_SETUP_DATA_RESPONSE',
      OAuth2SetupData.create(RESPONSE),
      SERIALIZED_RESPONSE,
    ],
    ['THUNK', respond => respond(RESPONSE), SERIALIZED_RESPONSE],
    ['PROMISE', Promise.resolve(RESPONSE), SERIALIZED_RESPONSE],
  ] as Array<[string, any, any]>)(
    'should return %s onOAuthStart response',
    async (type, response, expectedResult) => {
      const mockFn = jest.fn(() => response);
      const handler = createBridgeHandler({
        onOAuthStart: mockFn,
      });
      const res = await serve(handler)(BODY);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
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
