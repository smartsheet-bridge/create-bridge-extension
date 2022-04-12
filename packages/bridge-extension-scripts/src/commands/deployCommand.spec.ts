import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { CreateBuildServiceFn } from '../services/buildService';
import { CreateDeployServiceFn } from '../services/deployService';
import { createDeployCommand } from './deployCommand';

const COMMAND_ALIASES = ['deploy', 'd', 'publish'];
const spyError = jest.spyOn(Logger, 'error');
const mockDeploy = jest.fn(() => Promise.resolve());
const mockCreateDeployService: CreateDeployServiceFn = jest.fn(() => {
  return mockDeploy as ReturnType<CreateDeployServiceFn>;
});
const mockBuild = jest.fn(() => Promise.resolve());
const mockCreateBuildService: CreateBuildServiceFn = jest.fn(() => {
  return mockBuild as ReturnType<CreateBuildServiceFn>;
});

afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe.each(COMMAND_ALIASES)('deployCommand %s', cmd => {
  it('Will deploy successfully w/ defaults', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(
          createDeployCommand(mockCreateDeployService, mockCreateBuildService)
        )
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateBuildService).toBeCalledTimes(1);
    expect(mockCreateBuildService).toBeCalledWith({
      src: 'src',
      out: 'lib',
      options: {
        staticAssets: [],
        staticDependencies: [],
        clean: true,
      },
    });
    expect(mockBuild).toBeCalledTimes(1);

    expect(mockCreateDeployService).toBeCalledTimes(1);
    expect(mockCreateDeployService).toBeCalledWith({
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
    });
    expect(mockDeploy).toBeCalledTimes(1);
  });

  it('Will deploy successfully w/ args', () => {
    expect(() =>
      yargs([
        cmd,
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
        '--src',
        'testSrcDir',
        '--out',
        'testOutDir',
        '--no-clean',
      ])
        .command(
          createDeployCommand(mockCreateDeployService, mockCreateBuildService)
        )
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateBuildService).toBeCalledTimes(1);
    expect(mockCreateBuildService).toBeCalledWith({
      src: 'testSrcDir',
      out: 'testOutDir',
      options: {
        staticAssets: [],
        staticDependencies: [],
        clean: false,
      },
    });
    expect(mockBuild).toBeCalledTimes(1);

    expect(mockCreateDeployService).toBeCalledTimes(1);
    expect(mockCreateDeployService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      out: 'testOutDir',
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

  it('Will not build w/ --no-build', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--no-build',
      ])
        .command(
          createDeployCommand(mockCreateDeployService, mockCreateBuildService)
        )
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateBuildService).not.toHaveBeenCalled();
    expect(mockBuild).not.toHaveBeenCalled();
    expect(mockCreateDeployService).toBeCalledTimes(1);
    expect(mockDeploy).toBeCalledTimes(1);
  });

  it('Will not build w/o buildService', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--no-build',
      ])
        .command(createDeployCommand(mockCreateDeployService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateBuildService).not.toHaveBeenCalled();
    expect(mockBuild).not.toHaveBeenCalled();
    expect(mockCreateDeployService).toBeCalledTimes(1);
    expect(mockDeploy).toBeCalledTimes(1);
  });

  it('Will fail to deploy when no url given', () => {
    expect(() =>
      yargs([cmd, '--key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx'])
        .command(
          createDeployCommand(mockCreateDeployService, mockCreateBuildService)
        )
        .exitProcess(false)
        .parse()
    ).toThrowError(new URLNotFoundError('account abc'));
  });

  it('Will fail to deploy when no key given', () => {
    expect(() =>
      yargs([cmd, '--url', 'https://extension.example.com'])
        .command(
          createDeployCommand(mockCreateDeployService, mockCreateBuildService)
        )
        .exitProcess(false)
        .parse()
    ).toThrowError(new KeyNotFoundError('account abc'));
  });
});
