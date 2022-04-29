import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { CreateBuildServiceFn } from '../services/buildService';
import { createBuildCommand } from './buildCommand';

const COMMAND_ALIASES = ['build', 'b', 'compile'];
const spyError = jest.spyOn(Logger, 'error');
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

describe.each(COMMAND_ALIASES)('buildCommand %s', () => {
  it('Will build successfully w/ defaults', () => {
    expect(() =>
      yargs(['build'])
        .command(createBuildCommand(mockCreateBuildService))
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateBuildService).toBeCalledTimes(1);
    expect(mockCreateBuildService).toBeCalledWith({
      src: 'src',
      out: 'lib',
      options: {
        exclude: [],
        include: '**/**',
        clean: true,
      },
    });
    expect(mockBuild).toBeCalledTimes(1);
  });

  it('Will build successfully w/ args', () => {
    expect(() =>
      yargs([
        'build',
        '--src',
        'testSrcDir',
        '--out',
        'testOutDir',
        '--include',
        'test/include/glob',
        '--exclude',
        'test/exclude/glob1',
        '--exclude',
        'test/exclude/glob2',
        '--no-clean',
      ])
        .command(createBuildCommand(mockCreateBuildService))
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateBuildService).toBeCalledTimes(1);
    expect(mockCreateBuildService).toBeCalledWith({
      src: 'testSrcDir',
      out: 'testOutDir',
      options: {
        exclude: ['test/exclude/glob1', 'test/exclude/glob2'],
        include: 'test/include/glob',
        clean: false,
      },
    });
    expect(mockBuild).toBeCalledTimes(1);
  });
});
