import Axios, { AxiosStatic } from 'axios';
import mockFs from 'mock-fs';
import { createBridgeService } from './bridgeService';
import { createDeployService } from './deployService';
import * as httpExtension from './http/extension';
import { activateRevision, uploadSpec } from './http/extension';
import { get } from './http/platform';
import { BridgeHTTPInstance } from './http/types';

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios') as AxiosStatic;
  const instance = jest.fn();
  return {
    __esModule: true,
    default: {
      ...originalModule,
      create: jest.fn().mockReturnValue(instance),
    },
  };
});
jest.mock('./http/httpService', () => ({
  __esModule: true,
  createHTTPClient: jest.fn().mockReturnValue(Axios.create()),
}));
jest.mock('./http/createBridgeHttpInstance', () => ({
  __esModule: true,
  isBridgeHTTPInstance: jest.fn().mockReturnValue(true),
  default: jest.fn(() => Axios.create() as BridgeHTTPInstance),
}));
jest.mock('./http/extension', () => {
  const originalModule = jest.requireActual('./http/extension');
  return {
    __esModule: true,
    ...originalModule,
    activateRevision: jest.fn(() => Promise.resolve()),
    uploadSpec: jest.fn(() =>
      Promise.resolve({
        data: {
          data: {
            uploadTo: { uri: 'https://upload.example.com', method: 'PIGEON' },
          },
          meta: { requestID: '', version: '' },
        },
      })
    ),
  };
});
jest.mock('./http/platform');
jest.mock('./bridgeService', () => {
  const mockInstance = jest.fn();
  return {
    __esModule: true,
    createBridgeService: jest.fn(() => ({
      instance: mockInstance,
      extension: {
        uploadSpec,
        activateRevision,
      },
      platform: { get },
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

  it('authenticates by calling sdk.platform.get()', async () => {
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
        expect(get).toBeCalledTimes(1);
      })
      // .catch(e => console.log(e))
    ).resolves.not.toThrow();
  });

  it('uploads spec by calling sdk.extension.uploadSpec()', async () => {
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
        expect(uploadSpec).toBeCalledTimes(1);
      })
      // .catch(e => console.log(e))
    ).resolves.not.toThrow();
  });

  it('uploads by calling sdk.instance() to uploadTo destination', async () => {
    const sut = createDeployService({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      out: 'lib',
      options: {
        specFile: 'extension.json',
      },
    });

    const { instance } = createBridgeService('', '');
    await expect(
      sut().then(() => {
        expect(instance).toBeCalledTimes(1);
        expect(instance).toBeCalledWith(
          'https://upload.example.com',
          expect.objectContaining({ method: 'PIGEON' })
        );
      })
      // .catch(e => console.log(e))
    ).resolves.not.toThrow();
  });

  it('skips upload if uploadTo absent from response', async () => {
    jest.spyOn(httpExtension, 'uploadSpec').mockResolvedValue({
      status: 0,
      statusText: '',
      headers: '',
      config: {},
      data: {
        links: {},
        meta: { requestID: '', version: '' },
        data: {
          accountID: '',
          createdAt: '',
          id: '',
          modifiedAt: '',
          revisionID: '',
          uploadTo: undefined,
        },
      },
    });

    const sut = createDeployService({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      out: 'lib',
      options: {
        specFile: 'extension.json',
      },
    });

    const { instance } = createBridgeService('', '');
    await expect(
      sut().then(() => {
        expect(instance).toBeCalledTimes(0);
      })
      // .catch(e => console.log(e))
    ).resolves.not.toThrow();
  });
});
