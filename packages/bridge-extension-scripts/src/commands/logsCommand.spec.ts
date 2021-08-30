import { Logger, UserError } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { CreateLogsServiceFn } from '../services/logsService';
import { createLogsCommand } from './logsCommand';

const COMMAND_ALIASES = ['logs', 'l', 'log', 'stream-log', 'stream-logs'];
const spyError = jest.spyOn(Logger, 'error');
jest.spyOn(console, 'error').mockImplementation(() => {});
const mockLogs = jest.fn(() => Promise.resolve());
const mockCreateLogsService: CreateLogsServiceFn = jest.fn(() => {
  return mockLogs as ReturnType<CreateLogsServiceFn>;
});

afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  jest.restoreAllMocks();
});

describe.each(COMMAND_ALIASES)('logsCommand %s', cmd => {
  it('Will logs successfully', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(createLogsCommand(mockCreateLogsService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateLogsService).toBeCalledTimes(1);
    expect(mockCreateLogsService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        milliseconds: 0,
        specFile: 'extension.json',
        name: undefined,
      },
    });
    expect(mockLogs).toBeCalledTimes(1);
  });

  it('Will logs successfully w/ args', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--m',
        '1',
        '--specFile',
        'abc.txt',
        '--extension',
        'Filename',
      ])
        .command(createLogsCommand(mockCreateLogsService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateLogsService).toBeCalledTimes(1);
    expect(mockCreateLogsService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        milliseconds: 60000,
        specFile: 'abc.txt',
        name: 'Filename',
      },
    });
    expect(mockLogs).toBeCalledTimes(1);
  });

  it('Will fail to logs when no url given', () => {
    expect(() =>
      yargs([cmd, '--key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx'])
        .command(createLogsCommand(mockCreateLogsService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new URLNotFoundError('logs'));
  });

  it('Will fail to logs when no key given', () => {
    expect(() =>
      yargs([cmd, '--url', 'https://extension.example.com'])
        .command(createLogsCommand(mockCreateLogsService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new KeyNotFoundError('logs'));
  });

  it('Will fail to logs when minutes is not number', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--minutes',
        'NaN',
      ])
        .command(createLogsCommand(mockCreateLogsService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new UserError("Parameter 'minutes' must be a number!", ''));
  });
});
