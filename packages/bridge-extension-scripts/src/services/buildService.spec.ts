import builder from 'esbuild';
import copyStaticFiles from 'esbuild-copy-static-files';
import fsExtra from 'fs-extra';
import mockFs from 'mock-fs';
import { createBuildService, CreateBuildServiceArgs } from './buildService';

jest.mock('esbuild', () => {
  const originalModule = jest.requireActual('esbuild');
  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      build: jest.fn(() => Promise.resolve({ errors: [], warnings: [] })),
    },
  };
});

jest.mock('esbuild-copy-static-files', () => {
  return {
    __esModule: true,
    default: jest.fn(opt => opt),
  };
});

const emptyDirSync = jest.spyOn(fsExtra, 'emptyDirSync');

describe('createBuildService', () => {
  beforeEach(() => {
    mockFs({
      src: {
        'index.ts': '',
      },
    });
  });
  afterEach(() => {
    mockFs.restore();
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const options: CreateBuildServiceArgs[] = [
    {
      // all options
      src: 'src',
      out: 'lib',
      options: {
        staticDependencies: ['*.abc'],
        staticAssets: ['*.abc'],
        clean: true,
        symlinks: false,
        entrypoint: 'src/index.ts',
      },
    },
    {
      // only required options
      src: 'src',
      out: 'lib',
      options: {},
    },
    {
      // mixed bag
      src: 'src',
      out: 'lib',
      options: {
        staticDependencies: ['*.abc'],
      },
    },
  ];

  it.each(options)('does not break', opt => {
    expect(() => createBuildService(opt)).not.toThrow();
  });

  it('clean if true', () => {
    createBuildService({
      src: 'src',
      out: 'lib',
      options: {
        clean: true,
      },
    });

    expect(emptyDirSync).toHaveBeenCalledTimes(1);
  });

  it('skip clean if false', () => {
    createBuildService({
      src: 'src',
      out: 'lib',
      options: {
        clean: false,
      },
    });

    expect(emptyDirSync).not.toHaveBeenCalled();
  });

  it('throw if no entrypoint found', () => {
    mockFs({
      src: {},
    });
    const spyReaddirSync = jest.spyOn(fsExtra, 'readdirSync');

    expect(() =>
      createBuildService({
        src: 'src',
        out: 'lib',
        options: {},
      })
    ).toThrow('No suitable entrypoint found!');
    expect(spyReaddirSync).toBeCalledTimes(1);
  });

  it('no error if entrypoint found', () => {
    const spyReaddirSync = jest.spyOn(fsExtra, 'readdirSync');

    expect(() =>
      createBuildService({
        src: 'src',
        out: 'lib',
        options: {},
      })
    ).not.toThrow();
    expect(spyReaddirSync).toBeCalledTimes(1);
  });
});

describe('build', () => {
  beforeEach(() => {
    mockFs({
      src: {
        'index.ts': '',
      },
    });
  });
  afterEach(() => {
    mockFs.restore();
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('calls esbuild with the right options', async () => {
    mockFs({
      xyz: '',
      src: {
        'index.ts': '',
      },
    });

    const sut = createBuildService({
      src: 'src',
      out: 'lib',
      options: {
        clean: false,
        staticAssets: ['xyz'],
        staticDependencies: ['abc'],
        symlinks: true,
      },
    });

    await expect(
      sut().then(() => {
        expect(builder.build).toBeCalledWith({
          bundle: true,
          entryPoints: [`${process.cwd()}/src/index.ts`],
          external: ['abc'],
          format: 'cjs',
          minify: true,
          outdir: `${process.cwd()}/lib`,
          platform: 'node',
          plugins: [
            {
              dereference: true,
              dest: `${process.cwd()}/lib/node_modules/abc`,
              errorOnExist: true,
              recursive: true,
              src: `${process.cwd()}/node_modules/abc`,
            },
            {
              dereference: true,
              dest: `${process.cwd()}/lib/xyz`,
              errorOnExist: true,
              recursive: true,
              src: 'xyz',
            },
          ],
          sourcemap: true,
          splitting: false,
          target: ['node12'],
        });
      })
    ).resolves.not.toThrow();
  });

  it('creates plugin configs for static dependencies', async () => {
    const sut = createBuildService({
      src: 'src',
      out: 'lib',
      options: {
        staticDependencies: ['abc', 'def', 'xyz'],
        entrypoint: 'x',
      },
    });

    await expect(
      sut().then(() => {
        expect(copyStaticFiles).toBeCalledTimes(3);
        expect(copyStaticFiles).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            src: `${process.cwd()}/node_modules/abc`,
            dest: `${process.cwd()}/lib/node_modules/abc`,
          })
        );
        expect(copyStaticFiles).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            src: `${process.cwd()}/node_modules/def`,
            dest: `${process.cwd()}/lib/node_modules/def`,
          })
        );
      })
    ).resolves.not.toThrow();
  });
  it('creates plugin configs for static assets using glob patterns', async () => {
    mockFs({
      abc: '',
      def: '',
    });

    const sut = createBuildService({
      src: 'src',
      out: 'lib',
      options: {
        staticAssets: ['abc', 'def', 'xyz'],
        entrypoint: 'x',
      },
    });

    await expect(
      sut().then(() => {
        expect(copyStaticFiles).toBeCalledTimes(2);
        expect(copyStaticFiles).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            src: `abc`,
            dest: `${process.cwd()}/lib/abc`,
          })
        );
        expect(copyStaticFiles).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            src: `def`,
            dest: `${process.cwd()}/lib/def`,
          })
        );
      })
    ).resolves.not.toThrow();
  });
  it('protects against spurious paths in static deps and assets', async () => {
    mockFs({
      abc: '',
    });

    const sut = createBuildService({
      src: 'src',
      out: 'lib',
      options: {
        staticDependencies: ['123', '/456', 'node_modules/../../789'],
        staticAssets: ['./abc', '/def', 'src/../../xyz'],
        entrypoint: 'x',
      },
    });

    await expect(
      sut().then(() => {
        expect(copyStaticFiles).toBeCalledTimes(2);
        expect(copyStaticFiles).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            src: `${process.cwd()}/node_modules/123`,
            dest: `${process.cwd()}/lib/node_modules/123`,
          })
        );
        expect(copyStaticFiles).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            src: `./abc`,
            dest: `${process.cwd()}/lib/abc`,
          })
        );
      })
    ).resolves.not.toThrow();
  });

  it('use custom entrypoint if provided', async () => {
    const sut = createBuildService({
      src: 'src',
      out: 'lib',
      options: {
        entrypoint: 'entry/poin.ts',
      },
    });

    await expect(
      sut().then(() => {
        expect(builder.build).toBeCalledWith({
          bundle: true,
          entryPoints: ['entry/poin.ts'],
          external: [],
          format: 'cjs',
          minify: true,
          outdir: `${process.cwd()}/lib`,
          platform: 'node',
          plugins: [],
          sourcemap: true,
          splitting: false,
          target: ['node12'],
        });
      })
    ).resolves.not.toThrow();
  });

  it.each(['index.js', 'index.ts'])(
    'detect entrypoint if not provided',
    async file => {
      const src = {};
      src[file] = '';
      mockFs({
        src,
      });

      const sut = createBuildService({
        src: 'src',
        out: 'lib',
        options: {},
      });

      await expect(
        sut().then(() => {
          expect(builder.build).toBeCalledWith({
            bundle: true,
            entryPoints: [`${process.cwd()}/src/${file}`],
            external: [],
            format: 'cjs',
            minify: true,
            outdir: `${process.cwd()}/lib`,
            platform: 'node',
            plugins: [],
            sourcemap: true,
            splitting: false,
            target: ['node12'],
          });
        })
      ).resolves.not.toThrow();
    }
  );
});
