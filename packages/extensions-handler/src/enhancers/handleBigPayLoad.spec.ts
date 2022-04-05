import axios from 'axios';
import { handleBigPayLoad } from './handleBigPayLoad';
import { createExtensionHandler } from '../handler';

const data = { hello: 'world' };

describe('handleBigPayLoad', () => {
  it('should call with s3Execution  ', () => {
    const TEST_LOAD = {
      meta: {
        type: 'streamExecution',
      },
      body: {
        getUrl: 'google.com',
        postUrl: 'google.com',
        body: '',
      },
    };
    const cb = jest.fn();
    const mockget = jest.spyOn(axios, 'post');
    mockget.mockImplementationOnce(() => Promise.resolve(data));
    const extensibleHandler = createExtensionHandler(handleBigPayLoad);
    extensibleHandler(TEST_LOAD, cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, TEST_LOAD);
  });
});
