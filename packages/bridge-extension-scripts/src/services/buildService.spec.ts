import { createBuildService } from './buildService';

describe('buildService', () => {
  it('does not break', () => {
    expect(() =>
      createBuildService({
        src: 'src',
        out: 'lib',
        options: {
          staticDependencies: [],
          exclude: [],
          include: '**/**',
          clean: true,
        },
      })
    ).not.toThrow();
  });
});
