import { BadRequestError } from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../src';
import { BadHandleOAuth2CodeResponseError } from '../src/errors/BadHandleOAuth2CodeResponseError';
import { HandleOAuth2CodePayload } from '../src/handlers/handleOAuth2HandleCode';
import { OAuthType } from '../src/models/OAuthType';
import { HandleOAuth2CodeResponse } from '../src/responses/HandleOAuth2CodeResponse';
import { serve } from './express';

describe('integration tests - onOAuthHandleCode', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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

  const BODY: HandleOAuth2CodePayload = {
    event: 'OAUTH2_HANDLE_CODE',
    payload: {
      code: 'CODE',
      oauthType: OAuthType.Provider,
      redirectURI: 'example.com/redirect',
      registrationData: SETTINGS,
    },
  };

  it('undefined function should throw error', async () => {
    const expectedError = new BadRequestError(
      'onOAuthHandleCode function has not been defined'
    );

    const handler = createBridgeHandler({});
    const stderr = jest.spyOn(console, 'error').mockImplementation(() => {});
    const res = await serve(handler).post('/').send(BODY);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedError.toJSON());
    expect(stderr).toBeCalledTimes(1);
    expect(stderr).toBeCalledWith(expectedError);
  });

  it('should return SUCCESS with no payload', async () => {
    const mockFn = jest.fn(() => RESPONSE);
    const handler = createBridgeHandler({ onOAuthHandleCode: mockFn });
    const res = await serve(handler).post('/').send({
      event: 'OAUTH2_HANDLE_CODE',
      payload: {},
    });
    expect(res.status).toBe(200);
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
      const expectedResult = new BadHandleOAuth2CodeResponseError(
        type || typeof response
      );
      const handler = createBridgeHandler({
        onOAuthHandleCode: mockFn,
      });
      const res = await serve(handler).post('/').send(BODY);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedResult.toJSON());
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
    ['THUNK', respond => respond(RESPONSE), SERIALIZED_RESPONSE],
    ['PROMISE', Promise.resolve(RESPONSE), SERIALIZED_RESPONSE],
  ] as Array<[string, any, any]>)(
    'should return %s onOAuthHandleCode response',
    async (type, response, expectedResult) => {
      const mockFn = jest.fn(() => response);
      const handler = createBridgeHandler({
        onOAuthHandleCode: mockFn,
      });
      const res = await serve(handler).post('/').send(BODY);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith(
        {
          code: 'CODE',
          oauthType: OAuthType.Provider,
          redirectURI: 'example.com/redirect',
        },
        {
          settings: SETTINGS,
        }
      );
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedResult);
    }
  );
});
