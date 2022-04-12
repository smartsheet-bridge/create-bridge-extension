import { createBuildService } from './buildService';

jest.mock('fs', () => ({
  emptyDirSync: jest.fn(),
  readdirSync: jest.fn(),
}));

describe('buildService', () => {
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
        },
      })
    ).not.toThrow();
  });
});
