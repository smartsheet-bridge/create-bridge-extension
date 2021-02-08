import { createLogsService } from './logsService';

describe('deployService', () => {
  it('does not break', () => {
    expect(() =>
      createLogsService({
        host: 'https://extension.example.com',
        auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        options: {
          milliseconds: 60000,
          specFile: 'abc.txt',
          name: 'Filename',
        },
      })
    ).not.toThrow();
  });
});
