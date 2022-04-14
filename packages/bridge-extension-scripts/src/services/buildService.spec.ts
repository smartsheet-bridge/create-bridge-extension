import { createBuildService } from './buildService';

jest.mock('fs-extra', () => ({
  emptyDirSync: jest.fn(),
  readdirSync: jest.fn().mockReturnValue(['index.ts']),
}));

describe('createBuildService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('does not break', () => {
    expect(() =>
      createBuildService({
        src: 'src',
        out: 'lib',
        options: {
          staticDependencies: [],
          staticAssets: [],
          clean: true,
          symlinks: false,
        },
      })
    ).not.toThrow();
  });
});
