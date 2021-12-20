/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from 'axios';
import { BridgeHTTPRequestConfig, BridgeHTTPResponse } from './types';
import {
  AccountURL,
  createAPICall,
  createAPIModule,
  parseAccountURL,
} from './utils';

describe('utils', () => {
  describe('parseAccountURL', () => {
    it.each([
      [
        'abc.converse.ai',
        {
          accountName: 'abc',
          hostName: 'converse.ai',
          protocol: 'https',
        },
      ],
      [
        'https://abc.converse.ai',
        {
          accountName: 'abc',
          hostName: 'converse.ai',
          protocol: 'https',
        },
      ],
      [
        'http://abc.converse.ai',
        {
          accountName: 'abc',
          hostName: 'converse.ai',
          protocol: 'http',
        },
      ],
      [
        'abc.converse.ai/#/dashboard',
        {
          accountName: 'abc',
          hostName: 'converse.ai',
          protocol: 'https',
        },
      ],
      [
        'https://abc.converse.ai/#/dashboard',
        {
          accountName: 'abc',
          hostName: 'converse.ai',
          protocol: 'https',
        },
      ],
      [
        'http://abc.converse.ai/#/dashboard',
        {
          accountName: 'abc',
          hostName: 'converse.ai',
          protocol: 'http',
        },
      ],
      [
        'abc.bridge.smartsheet.com',
        {
          accountName: 'abc',
          hostName: 'bridge.smartsheet.com',
          protocol: 'https',
        },
      ],
      [
        'https://abc.bridge.smartsheet.com',
        {
          accountName: 'abc',
          hostName: 'bridge.smartsheet.com',
          protocol: 'https',
        },
      ],
      [
        'http://abc.bridge.smartsheet.com',
        {
          accountName: 'abc',
          hostName: 'bridge.smartsheet.com',
          protocol: 'http',
        },
      ],
      [
        'abc.bridge.smartsheet.com/#/dashboard',
        {
          accountName: 'abc',
          hostName: 'bridge.smartsheet.com',
          protocol: 'https',
        },
      ],
      [
        'https://abc.bridge.smartsheet.com/#/dashboard',
        {
          accountName: 'abc',
          hostName: 'bridge.smartsheet.com',
          protocol: 'https',
        },
      ],
      [
        'http://abc.bridge.smartsheet.com/#/dashboard',
        {
          accountName: 'abc',
          hostName: 'bridge.smartsheet.com',
          protocol: 'http',
        },
      ],
    ] as Array<[string, AccountURL]>)('parses %s', (input, output) => {
      expect(parseAccountURL(input)).toEqual(output);
    });
  });

  describe('createAPICall', () => {
    interface APIData {
      a: string;
      b: string;
    }

    const mockFn = jest.fn(
      (
        data: APIData,
        config?: BridgeHTTPRequestConfig
      ): Promise<BridgeHTTPResponse> => {
        const mockResponse: BridgeHTTPResponse = {
          config: {},
          data: {},
          headers: {},
          status: 200,
          statusText: '200',
          request: undefined,
        };
        return Promise.resolve(mockResponse);
      }
    );

    const mockIn = jest.fn(instance => mockFn);

    beforeEach(() => {
      mockFn.mockClear();
      mockIn.mockClear();
    });

    it('creates functional API call', async () => {
      const APICall = createAPICall(mockIn);
      await APICall({ a: 'a', b: 'b' }, {});

      expect(mockIn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith({ a: 'a', b: 'b' });
    });
    it('creates API call on instance', async () => {
      const APICall = createAPICall(mockIn);
      const axios = Axios;
      await APICall(axios)({ a: 'a', b: 'b' });

      expect(mockIn).toBeCalledTimes(1);
      expect(mockIn).toBeCalledWith(axios);
      expect(mockFn).toBeCalledTimes(1);
      expect(mockFn).toBeCalledWith({ a: 'a', b: 'b' });
    });
  });

  describe('createAPIModule', () => {
    it('creates API calls on an instance', () => {
      const fn = (
        data: {},
        config?: BridgeHTTPRequestConfig
      ): Promise<BridgeHTTPResponse> =>
        Promise.resolve({
          config: {},
          data: {},
          headers: {},
          status: 200,
          statusText: '200',
          request: undefined,
        });
      const mock = jest.fn(instance => fn);

      const api = createAPIModule({ mock });
      expect(api(Axios)).toHaveProperty('mock', fn);
    });
  });
});
