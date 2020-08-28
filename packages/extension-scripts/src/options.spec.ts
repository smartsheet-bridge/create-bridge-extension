import { urlCoerce } from './options';

describe('options', () => {
  describe('coerce url', () => {
    it.each([
      [
        'https://example.bridge.smartsheet.com',
        'https://example.bridge.smartsheet.com',
      ],
      [
        'https://example.bridge.smartsheet.com/extra/path',
        'https://example.bridge.smartsheet.com',
      ],
      [
        'https://example.bridge.smartsheet.com?queryParams=1',
        'https://example.bridge.smartsheet.com',
      ],
      [
        'http://example.bridge.smartsheet.com',
        'http://example.bridge.smartsheet.com',
      ],
      [
        'http://example.bridge.smartsheet.com/extra/path',
        'http://example.bridge.smartsheet.com',
      ],
      [
        'http://example.bridge.smartsheet.com?queryParams=1',
        'http://example.bridge.smartsheet.com',
      ],
      [
        'example.bridge.smartsheet.com',
        'https://example.bridge.smartsheet.com',
      ],
      [
        'example.bridge.smartsheet.com/extra/path',
        'https://example.bridge.smartsheet.com',
      ],
      [
        'example.bridge.smartsheet.com?queryParams=1',
        'https://example.bridge.smartsheet.com',
      ],
    ])('Given URL `%s` return `%s`', (argString, expectedUrl) => {
      expect(urlCoerce(argString)).toBe(expectedUrl);
    });
  });
});
