import axios, { AxiosResponse } from 'axios';
import { createExtensionHandler, ExtensionHandlerEnhancer } from '../handler';
import { handleBigPayLoad } from './handleBigPayLoad';
import { compose } from '../utils/compose';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const MOCKED_S3_GET_RESPONSE = { s3: 'data', method: 'get' };
const MOCKED_S3_POST_RESPONSE = { s3: 'data', method: 'post' };
const MOCKED_GET_RESPONSE: AxiosResponse = {
  data: MOCKED_S3_GET_RESPONSE,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
const MOCKED_POST_RESPONSE: AxiosResponse = {
  data: MOCKED_S3_POST_RESPONSE,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
const STREAM_PAYLOAD = { stream: 'payload' };
const TEST_PAYLOAD_STREAM = {
  meta: {
    type: 'streamExecution',
  },
  body: {
    getUrl: 'google.com',
    ***REMOVED***: 'google.com',
    payload: STREAM_PAYLOAD,
  },
};
const TEST_PAYLOAD_S3 = {
  meta: {
    type: 's3Execution',
  },
  body: {
    getUrl: 'google.com',
    ***REMOVED***: 'https://google.com',
    payload: { s3: 'payload' },
  },
};
describe('handleBigPayLoad', () => {
  it('should have call callback with result for stream execution ', () => {
    const cb = jest.fn();
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    extensibleHandler(TEST_PAYLOAD_STREAM, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, STREAM_PAYLOAD);
  });

  it('should have payload from the body from stream execution ', () => {
    const enhancer1Fn = jest.fn();
    const enhancerA: ExtensionHandlerEnhancer = create => () => {
      const h = create();
      enhancer1Fn.mockImplementation((payload, callback) => {
        h(payload, callback);
      });
      return enhancer1Fn;
    };
    const enhancer = compose(handleBigPayLoad, enhancerA);
    const cb = jest.fn();

    const extensibleHandler = createExtensionHandler(enhancer);
    extensibleHandler(TEST_PAYLOAD_STREAM, cb);
    expect(enhancer1Fn).toHaveBeenCalledTimes(1);
    expect(enhancer1Fn).toHaveBeenCalledWith(STREAM_PAYLOAD, expect.anything());
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, STREAM_PAYLOAD);
  });

  it('should have payload from the S3 presigned url ', async done => {
    const enhancer1Fn = jest.fn();
    const enhancerA: ExtensionHandlerEnhancer = create => () => {
      const h = create();
      enhancer1Fn.mockImplementation((payload, callback) => {
        h(payload, callback);
      });
      return enhancer1Fn;
    };
    const enhancer = compose(handleBigPayLoad, enhancerA);
    mockedAxios.get.mockResolvedValueOnce(MOCKED_GET_RESPONSE);
    const extensibleHandler = createExtensionHandler(enhancer);
    extensibleHandler(TEST_PAYLOAD_S3, () => {
      expect(enhancer1Fn).toHaveBeenCalledTimes(1);
      expect(enhancer1Fn).toHaveBeenCalledWith(
        MOCKED_S3_GET_RESPONSE,
        expect.anything()
      );
      done();
    });
  });

  it('callback result should be the post result for s3 execution ', done => {
    mockedAxios.get.mockResolvedValueOnce(MOCKED_GET_RESPONSE);
    mockedAxios.post.mockResolvedValueOnce(MOCKED_POST_RESPONSE);
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    extensibleHandler(TEST_PAYLOAD_S3, (err, result) => {
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result).toEqual(MOCKED_S3_POST_RESPONSE);
      done();
    });
  });

  it('should result in error if not able to get payload from s3', async done => {
    const expectedError = new Error('cant read from s3');
    mockedAxios.get.mockRejectedValueOnce(expectedError);
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    extensibleHandler(TEST_PAYLOAD_S3, err => {
      expect(err).toEqual(expectedError);
      done();
    });
  });

  it('should result in error if not able to put payload into s3', async done => {
    mockedAxios.get.mockResolvedValueOnce(MOCKED_GET_RESPONSE);
    const expectedError = new Error('cant put payload into  s3');
    mockedAxios.post.mockRejectedValueOnce(expectedError);
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    extensibleHandler(TEST_PAYLOAD_S3, err => {
      expect(err).toEqual(expectedError);
      done();
    });
  });

  it('should not break the existing functionality , callback should have been called with passed result', () => {
    const PAYLOAD = { existing: 'payload' };
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    const cb = jest.fn();
    extensibleHandler(PAYLOAD, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, PAYLOAD);
  });
  it('should not break the existing functionality , handle should have been called with passed payload', () => {
    const PAYLOAD = { existing: 'payload' };
    const enhancer1Fn = jest.fn();
    const enhancerA: ExtensionHandlerEnhancer = create => () => {
      const h = create();
      enhancer1Fn.mockImplementation((payload, callback) => {
        h(payload, callback);
      });
      return enhancer1Fn;
    };
    const enhancer = compose(handleBigPayLoad, enhancerA);
    const cb = jest.fn();
    const extensibleHandler = createExtensionHandler(enhancer);
    extensibleHandler(PAYLOAD, cb);
    expect(enhancer1Fn).toHaveBeenCalledTimes(1);
    expect(enhancer1Fn).toHaveBeenCalledWith(PAYLOAD, expect.anything());
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, PAYLOAD);
  });
});
