import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { AliasAlreadyExistsError } from '../../errors/AliasAlreadyExistsError';
import { KeyNotFoundError } from '../../errors/KeyNotFoundError';
import { URLNotFoundError } from '../../errors/URLNotFoundError';
import { CreateAccountServiceFn } from '../../services/accountService';
import { createAddAccountCommand } from './addAccountCommand';

const COMMAND_ALIASES = ['add', 'a'];
jest.spyOn(console, 'error').mockImplementation(() => {});
const spyInfo = jest.spyOn(Logger, 'info');
const spyError = jest.spyOn(Logger, 'error');
const mockSaveAccount = jest.fn();
const mockGetAccount = jest.fn();
const mockCreateAccountService: CreateAccountServiceFn = () => {
  return ({
    getAccount: mockGetAccount,
    saveAccount: mockSaveAccount,
  } as unknown) as ReturnType<CreateAccountServiceFn>;
};

afterEach(() => {
  jest.clearAllMocks();
  mockGetAccount.mockReset();
});
afterAll(() => {
  jest.restoreAllMocks();
});

describe.each(COMMAND_ALIASES)('addAccountCommand %s', cmd => {
  it('Will add alias successfully', () => {
    expect(() =>
      yargs([
        cmd,
        'abc',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(createAddAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockSaveAccount).toBeCalledTimes(1);
    expect(mockSaveAccount).toBeCalledWith('abc', {
      url: 'https://extension.example.com',
      key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
    });
    expect(spyInfo).toBeCalledWith(
      'Added account alias',
      "'abc'",
      Chalk.cyan.underline('https://extension.example.com')
    );
  });

  it('Will add default alias successfully when no alias given', () => {
    expect(() =>
      yargs([
        cmd,
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(createAddAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockSaveAccount).toBeCalledTimes(1);
    expect(mockSaveAccount).toBeCalledWith('default', {
      url: 'https://extension.example.com',
      key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
    });
    expect(spyInfo).toBeCalledWith(
      'Added account alias',
      "'default'",
      Chalk.cyan.underline('https://extension.example.com')
    );
  });

  it('Will overwrite alias successfully if `--overwrite` is given', () => {
    mockGetAccount.mockReturnValue({
      url: 'https://existing.example.com',
      key: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyy-yyyyyy',
    });
    expect(() =>
      yargs([
        cmd,
        'abc',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--overwrite',
      ])
        .command(createAddAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(mockSaveAccount).toBeCalledWith('abc', {
      url: 'https://extension.example.com',
      key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
    });
    expect(spyInfo).toBeCalledWith(
      'Added account alias',
      "'abc'",
      Chalk.cyan.underline('https://extension.example.com')
    );
  });

  it('Will fail to overwrite alias if `--overwrite` is not given', () => {
    mockGetAccount.mockReturnValue({
      url: 'https://existing.example.com',
      key: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyy-yyyyyy',
    });
    expect(() =>
      yargs([
        cmd,
        'abc',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(createAddAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new AliasAlreadyExistsError('abc'));
  });

  it('Will fail to add alias when no url given', () => {
    expect(() =>
      yargs([cmd, 'abc', '--key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx'])
        .command(createAddAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new URLNotFoundError('account abc'));
  });

  it('Will fail to add alias when no key given', () => {
    expect(() =>
      yargs([cmd, 'abc', '--url', 'https://extension.example.com'])
        .command(createAddAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).toThrowError(new KeyNotFoundError('account abc'));
  });
});
