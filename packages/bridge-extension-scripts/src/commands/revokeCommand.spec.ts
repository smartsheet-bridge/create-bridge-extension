import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { CreateRevokeServiceFn } from '../services/revokeService';
import { revokeCommand } from './revokeCommand';

const spyError = jest.spyOn(Logger, 'error');
const mockRevoke = jest.fn(() => Promise.resolve());
const mockCreateRevokeService: CreateRevokeServiceFn = jest.fn(() => {
  return mockRevoke as ReturnType<CreateRevokeServiceFn>;
});

describe('revokeCommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Will revoke successfully', () => {
    expect(() =>
      yargs([
        'revoke',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(revokeCommand(mockCreateRevokeService))
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
        'revoke',
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
        .command(revokeCommand(mockCreateRevokeService))
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
      revokeCommand(mockCreateRevokeService).handler({
        $0: '',
        _: [''],
        url: 'https://extension.example.com',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        force: 'hello',
      })
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockCreateRevokeService).toBeCalledTimes(1);
    expect(mockCreateRevokeService).toBeCalledWith({
      host: 'https://extension.example.com',
      auth: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      options: {
        force: false,
      },
    });
    expect(mockRevoke).toBeCalledTimes(1);
  });

  it('Will fail to revoke when no url given', () => {
    expect(() =>
      revokeCommand(mockCreateRevokeService).handler({
        $0: '',
        _: [''],
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new URLNotFoundError('account abc'));
  });

  it('Will fail to revoke when no key given', () => {
    expect(() =>
      revokeCommand(mockCreateRevokeService).handler({
        $0: '',
        _: [''],
        url: 'https://extension.example.com',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new KeyNotFoundError('account abc'));
  });
});
