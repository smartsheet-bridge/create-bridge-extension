import { AccountURL, parseAccountURL } from './utils';

describe('utils', () => {
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
