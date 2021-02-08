import { Logger, UserError } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { CreateLogsServiceFn } from '../services/logsService';
import { logsCommand } from './logsCommand';

const spyError = jest.spyOn(Logger, 'error');
const mockLogs = jest.fn(() => Promise.resolve());
const mockCreateLogsService: CreateLogsServiceFn = jest.fn(() => {
  return mockLogs as ReturnType<CreateLogsServiceFn>;
});

describe('logsCommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Will logs successfully', () => {
    expect(() =>
      yargs([
        'logs',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(logsCommand(mockCreateLogsService))
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
        'logs',
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
        .command(logsCommand(mockCreateLogsService))
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
      logsCommand(mockCreateLogsService).handler({
        $0: '',
        _: [''],
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new URLNotFoundError('account abc'));
  });

  it('Will fail to logs when no key given', () => {
    expect(() =>
      logsCommand(mockCreateLogsService).handler({
        $0: '',
        _: [''],
        url: 'https://extension.example.com',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new KeyNotFoundError('account abc'));
  });

  it('Will fail to logs when minutes is not number', () => {
    expect(() =>
      logsCommand(mockCreateLogsService).handler({
        $0: '',
        _: [''],
        url: 'https://extension.example.com',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(
      new UserError("Parameter 'minutes' must be a number!", '')
    );
  });
});
