import { createBuildService } from './buildService';

jest.mock('fs', () => ({
  emptyDirSync: jest.fn(),
  readdirSync: jest.fn(),
}));

describe('buildService', () => {
  it('does not break', () => {
    expect(() =>
      createBuildService({
        src: 'src',
        out: 'lib',
        options: {
          staticDependencies: [],
          staticAssets: [],
          exclude: [],
          include: '**/**',
          clean: true,
        },
      })
    ).not.toThrow();
  });
});
