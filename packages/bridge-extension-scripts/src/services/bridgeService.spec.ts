import { createBridgeService } from './bridgeService';

describe('bridgeService', () => {
  it('does not break', () => {
    expect(() =>
      createBridgeService(
        'https://extension.example.com',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx'
      )
    ).not.toThrow();
  });
});
