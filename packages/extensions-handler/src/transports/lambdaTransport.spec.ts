import { Context } from 'aws-lambda';
import { handlePromises } from '../enhancers/handlePromises';
import { InternalError } from '../errors/InternalError';
import { createExtensionHandler, ExtensionHandlerEnhancer } from '../handler';
import { compose } from '../utils/compose';
import { normalizeError } from '../utils/normalizeError';
import { lambdaTransport } from './lambdaTransport';

const vars = process.env;

const MOCK_EVENT = {};
const MOCK_CONTEXT: Context = {
  awsRequestId: '',
  functionName: '',
  functionVersion: '',
  callbackWaitsForEmptyEventLoop: false,
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '',
  getRemainingTimeInMillis: jest.fn(),
  done: jest.fn(),
  fail: jest.fn(),
  succeed: jest.fn(),
};

const callback = jest.fn();

describe('lambdaEnhancer', () => {
  beforeEach(() => {
    process.env = vars;
    callback.mockReset();
    jest.restoreAllMocks();
  });
  it('should return error if no `event` or `context` given', () => {
    const fn = createExtensionHandler(lambdaTransport);
    const expectedErr = new InternalError('Lambda event can not be undefined.');
    expect(() => fn(undefined, undefined, callback)).not.toThrowError();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      null,
      normalizeError(expectedErr).toJSON()
    );
  });

  it('should return error if no `event` given', () => {
    const fn = createExtensionHandler(lambdaTransport);
    const expectedErr = new InternalError('Lambda event can not be undefined.');
    expect(() => fn(undefined, MOCK_CONTEXT, callback)).not.toThrowError();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      null,
      normalizeError(expectedErr).toJSON()
    );
  });

  it('should return error if no `context` given', () => {
    const fn = createExtensionHandler(lambdaTransport);
    const expectedErr = new InternalError(
      'Lambda context can not be undefined.'
    );
    expect(() => fn(MOCK_EVENT, undefined, callback)).not.toThrowError();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      null,
      normalizeError(expectedErr).toJSON()
    );
  });

  it('should return error as JSON object if caught downstream', () => {
    const SOME_ERROR = new Error('Hello');
    const buggyEnhancer: ExtensionHandlerEnhancer = () => () => {
      return (payload, cb) => {
        cb(new Error('Hello'));
      };
    };
    const composedEnhancer = compose(
      lambdaTransport,
      buggyEnhancer,
      handlePromises
    );
    const extensibleHandler = createExtensionHandler(composedEnhancer);
    extensibleHandler(MOCK_EVENT, MOCK_CONTEXT, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      null,
      normalizeError(SOME_ERROR).toJSON()
    );
  });

  it('should return error as JSON object if thrown downstream', () => {
    const SOME_ERROR = new Error('Hello');
    const buggyEnhancer: ExtensionHandlerEnhancer = () => () => {
      return () => {
        throw new Error('Hello');
      };
    };
    const composedEnhancer = compose(
      lambdaTransport,
      buggyEnhancer,
      handlePromises
    );
    const extensibleHandler = createExtensionHandler(composedEnhancer);
    extensibleHandler(MOCK_EVENT, MOCK_CONTEXT, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      null,
      normalizeError(SOME_ERROR).toJSON()
    );
  });

  it('should call given function with metadata and parameters', () => {
    const TEST = { hello: 'world' };
    const extensibleHandler = createExtensionHandler(lambdaTransport);
    extensibleHandler(TEST, MOCK_CONTEXT, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, TEST);
  });
});
