import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { CreateRevokeServiceFn } from '../services/revokeService';
import { createRevokeCommand } from './revokeCommand';

const COMMAND_ALIASES = ['remove', 'r', 'delete', 'remove', 'unpublish'];
const spyError = jest.spyOn(Logger, 'error');
jest.spyOn(console, 'error').mockImplementation(() => {});
const mockRevoke = jest.fn(() => Promise.resolve());
const mockCreateRevokeService: CreateRevokeServiceFn = jest.fn(() => {
  return mockRevoke as ReturnType<CreateRevokeServiceFn>;
});

afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe.each(COMMAND_ALIASES)('revokeCommand %s', cmd => {
  it('Will revoke successfully', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(createRevokeCommand(mockCreateRevokeService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateRevokeService).toBeCalledTimes(1);
    expect(mockCreateRevokeService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        force: false,
        specFile: 'extension.json',
        name: undefined,
      },
    });
    expect(mockRevoke).toBeCalledTimes(1);
  });

  it('Will revoke successfully w/ args', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--force',
        '--specFile',
        'abc.txt',
        '--extension',
        'Filename',
      ])
        .command(createRevokeCommand(mockCreateRevokeService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateRevokeService).toBeCalledTimes(1);
    expect(mockCreateRevokeService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        force: true,
        specFile: 'abc.txt',
        name: 'Filename',
      },
    });
    expect(mockRevoke).toBeCalledTimes(1);
  });

  it('Will revoke successfully w/ default force', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(createRevokeCommand(mockCreateRevokeService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateRevokeService).toBeCalledTimes(1);
    expect(mockCreateRevokeService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        force: false,
        specFile: 'extension.json',
      },
    });
    expect(mockRevoke).toBeCalledTimes(1);
  });

  it('Will fail to revoke when no url given', () => {
    expect(() =>
      yargs([cmd, '--key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx'])
        .command(createRevokeCommand(mockCreateRevokeService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new URLNotFoundError('account abc'));
  });

  it('Will fail to revoke when no key given', () => {
    expect(() =>
      yargs([cmd, '--url', 'https://extension.example.com'])
        .command(createRevokeCommand(mockCreateRevokeService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new KeyNotFoundError('account abc'));
  });
});
