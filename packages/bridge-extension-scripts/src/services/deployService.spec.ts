import { createDeployService } from './deployService';

describe('deployService', () => {
  it('does not break', () => {
    expect(() =>
      createDeployService({
        host: 'https://extension.example.com',
        auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        out: 'lib',
        options: {
          exclude: [],
          include: '**/**',
          symlinks: false,
          specFile: 'extension.json',
          env: undefined,
        },
      })
    ).not.toThrow();
  });
});
