/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { createRequest, createResponse } from 'node-mocks-http';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalError } from '../errors/InternalError';
import { createExtensionHandler } from '../handler';
import { httpTransport } from './httpTransport';

const vars = process.env;

describe('httpEnhancer', () => {
  beforeEach(() => {
    process.env = vars;
    jest.restoreAllMocks();
    jest.spyOn(global.console, 'error').mockImplementation();
  });

  it('should throw error if no request or body is given', () => {
    const fn = createExtensionHandler(httpTransport);
    // @ts-ignore
    expect(() => fn()).toThrowError(
      new InternalError('HTTP Request can not be undefined.')
    );
    // @ts-ignore
    expect(() => fn(undefined, createResponse())).toThrowError(
      new InternalError('HTTP Request can not be undefined.')
    );
    // @ts-ignore
    expect(() => fn(createRequest(), undefined)).toThrowError(
      new InternalError('HTTP Response can not be undefined.')
    );
    expect(console.error).toHaveBeenCalledTimes(3);
  });

  it('should throw error if no body is found on request', () => {
    const fn = createExtensionHandler(httpTransport);
    const req = createRequest();
    const res = createResponse();
    req.body = undefined;
    expect(() => fn(req, res)).toThrowError(
      new BadRequestError('HTTP Request must contain `body` property.')
    );
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._isJSON()).toBeTruthy();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      code: 'BAD_REQUEST',
      description: 'HTTP Request must contain `body` property.',
      httpStatus: 400,
    });
  });

  it('should catch error if SILENCE exists as an environment variable', () => {
    process.env.SILENCE = 'true';
    const fn = createExtensionHandler(httpTransport);
    const req = createRequest();
    const res = createResponse();
    req.body = undefined;
    expect(() => fn(req, res)).not.toThrow();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._isJSON()).toBeTruthy();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      code: 'BAD_REQUEST',
      description: 'HTTP Request must contain `body` property.',
      httpStatus: 400,
    });
  });

  it('should call given function with metadata and parameters', () => {
    const TEST = { hello: 'world' };
    const extensibleHandler = createExtensionHandler(httpTransport);
    const mockRequest = createRequest({
      body: TEST,
    });
    const mockResponse = createResponse();
    extensibleHandler(mockRequest, mockResponse);
    expect(mockResponse._isEndCalled()).toBeTruthy();
    expect(mockResponse._isJSON()).toBeTruthy();
    expect(mockResponse._getStatusCode()).toBe(200);
    expect(mockResponse._getJSONData()).toEqual(TEST);
  });
});
