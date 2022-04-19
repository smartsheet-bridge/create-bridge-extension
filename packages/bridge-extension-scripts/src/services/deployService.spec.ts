import mockFs from 'mock-fs';
import { createBridgeService } from './bridgeService';
import { createDeployService } from './deployService';

jest.mock('./bridgeService', () => {
  const originalModule = jest.requireActual('./bridgeService');
  return {
    __esModule: true,
    ...originalModule,
    createBridgeService: jest.fn((host, auth) => ({
      instance: { host, auth },
      extension: { uploadSpec: jest.fn() },
      platform: { get: jest.fn() },
    })),
  };
});

describe('createDeployService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('does not break', () => {
    expect(() =>
      createDeployService({
        host: 'https://extension.example.com',
        auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        out: 'lib',
        options: {
          symlinks: false,
          specFile: 'extension.json',
        },
      })
    ).not.toThrow();
  });

  it('creates the sdk with right options', () => {
    createDeployService({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      out: 'lib',
      options: {},
    });

    expect(createBridgeService).toBeCalledWith(
      'https://extension.example.com',
      'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx'
    );
  });
});

describe('deploy', () => {
  beforeEach(() => {
    mockFs({
      'extension.json': JSON.stringify({
        name: 'ext1',
        version: '1.0.0',
      }),
      'package.json': '{}',
    });
  });
  afterEach(() => {
    mockFs.restore();
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.skip('authenticates by calling sdk.platform.get()', async () => {
    const sut = createDeployService({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      out: 'lib',
      options: {
        specFile: 'extension.json',
      },
    });

    await expect(
      sut().then(() => {
        expect(
          createBridgeService(
            'https://extension.example.com',
            'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx'
          ).platform.get
        ).toBeCalledTimes(1);
      })
      // .catch(e => console.log(e))
    ).resolves.not.toThrow();
  });

  it.todo('creates an instance of archiver with right options');
  it.todo('calls archiver.glob with right options');
  it.todo('throws if archiver raises warning');
  it.todo('throws if archiver raises error');

  it.todo('uploads spec by calling sdk.extension.uploadSpec()');
  it.todo('uploads by calling sdk.instance() to uploadTo destination');
  it.todo('skips upload if uploadTo absent from response');

  it.todo('activates revision by calling sdk.extension.activateRevision()');
});
