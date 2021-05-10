import { createRevokeService } from './revokeService';

describe('deployService', () => {
  it('does not break', () => {
    expect(() =>
      createRevokeService({
        host: 'https://extension.example.com',
        auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        options: {
          force: false,
          specFile: 'extension.json',
          name: undefined,
        },
      })
    ).not.toThrow();
  });
});
