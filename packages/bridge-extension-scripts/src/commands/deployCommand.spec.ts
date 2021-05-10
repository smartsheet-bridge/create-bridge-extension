import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { CreateDeployServiceFn } from '../services/deployService';
import { deployCommand } from './deployCommand';

const spyError = jest.spyOn(Logger, 'error');
const mockDeploy = jest.fn(() => Promise.resolve());
const mockCreateDeployService: CreateDeployServiceFn = jest.fn(() => {
  return mockDeploy as ReturnType<CreateDeployServiceFn>;
});

describe('deployCommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Will deploy successfully', () => {
    expect(() =>
      yargs([
        'deploy',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(deployCommand(mockCreateDeployService))
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateDeployService).toBeCalledTimes(1);
    expect(mockCreateDeployService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        exclude: [],
        include: '**/**',
        symlinks: false,
        specFile: 'extension.json',
        env: undefined,
      },
    });
    expect(mockDeploy).toBeCalledTimes(1);
  });

  it('Will deploy successfully w/ args', () => {
    expect(() =>
      yargs([
        'deploy',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--include',
        '*.js',
        '--exclude',
        '*.ts',
        '--specFile',
        'abc.txt',
        '--symlinks',
      ])
        .command(deployCommand(mockCreateDeployService))
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateDeployService).toBeCalledTimes(1);
    expect(mockCreateDeployService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        exclude: ['*.ts'],
        include: '*.js',
        symlinks: true,
        specFile: 'abc.txt',
        env: undefined,
      },
    });
    expect(mockDeploy).toBeCalledTimes(1);
  });

  it('Will deploy successfully w/ default include', () => {
    expect(() =>
      deployCommand(mockCreateDeployService).handler({
        $0: '',
        _: [''],
        url: 'https://extension.example.com',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      })
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateDeployService).toBeCalledTimes(1);
    expect(mockCreateDeployService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        include: '**/**',
      },
    });
    expect(mockDeploy).toBeCalledTimes(1);
  });

  it('Will fail to deploy when no url given', () => {
    expect(() =>
      deployCommand(mockCreateDeployService).handler({
        $0: '',
        _: [''],
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new URLNotFoundError('account abc'));
  });

  it('Will fail to deploy when no key given', () => {
    expect(() =>
      deployCommand(mockCreateDeployService).handler({
        $0: '',
        _: [''],
        url: 'https://extension.example.com',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new KeyNotFoundError('account abc'));
  });
});
