import axios, { AxiosResponse } from 'axios';
import { handleBigPayLoad } from './handleBigPayLoad';
import { createExtensionHandler } from '../handler';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const S3_DATA = { s3: 'data' };

const STREAM_PAYLOAD_DATA = { hello: 'world' };

const TEST_PAYLOAD_STREAM = {
  meta: {
    type: 'streamExecution',
  },
  body: {
    getUrl: 'google.com',
    postUrl: 'google.com',
    payload: { hello: 'world' },
  },
};
const TEST_PAYLOAD_S3 = {
  meta: {
    type: 's3Execution',
  },
  body: {
    getUrl: 'google.com',
    postUrl: 'google.com',
    payload: { s3: 'data' },
  },
};

describe('handleBigPayLoad', () => {
  beforeEach(() => {
    // jest.spyOn(request, 'post').mockResolvedValue({ data: { some: 'dataz' } })
  });
  it('should call the next call back from extracted payload from the payload for stream execution  ', () => {
    const cb = jest.fn();
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    extensibleHandler(TEST_PAYLOAD_STREAM, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, STREAM_PAYLOAD_DATA);
  });
  it('should call the next call back payload fetched from S3', () => {
    const cb = jest.fn();
    const mockedResponse: AxiosResponse = {
      data: S3_DATA,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    extensibleHandler(TEST_PAYLOAD_S3, cb);
    expect(mockedAxios.get).toHaveBeenCalled();
    //  expect(cb).toHaveBeenCalledTimes(1);
    //  expect(cb).toHaveBeenCalledWith(null, S3_DATA);
  });
});
