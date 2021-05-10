import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { AliasAlreadyExistsError } from '../../errors/AliasAlreadyExistsError';
import { AliasNotFoundError } from '../../errors/AliasNotFoundError';
import { KeyNotFoundError } from '../../errors/KeyNotFoundError';
import { URLNotFoundError } from '../../errors/URLNotFoundError';
import { CreateAccountServiceFn } from '../../services/accountService';
import { accountCommand } from '../accountCommand';
import { addAccountCommand } from './addAccountCommand';

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

describe('addAccountCommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockGetAccount.mockReset();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Will add alias successfully', () => {
    expect(() =>
      yargs([
        'account',
        'add',
        'abc',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(accountCommand(mockCreateAccountService))
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

  it('Will overwrite alias successfully if `--overwrite` is given', () => {
    mockGetAccount.mockReturnValue({
      url: 'https://existing.example.com',
      key: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyy-yyyyyy',
    });
    expect(() =>
      yargs([
        'alias',
        'add',
        'abc',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        '--overwrite',
      ])
        .command(accountCommand(mockCreateAccountService))
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
        'user',
        'add',
        'abc',
        '--url',
        'https://extension.example.com',
        '--key',
        'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      ])
        .command(accountCommand(mockCreateAccountService))
        .parse()
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new AliasAlreadyExistsError('abc'));
  });

  it('Will fail to add alias when no alias given', () => {
    expect(() =>
      addAccountCommand(mockCreateAccountService).handler({
        $0: '',
        _: [''],
        url: 'https://extension.example.com',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new AliasNotFoundError());
  });

  it('Will fail to add alias when no url given', () => {
    expect(() =>
      addAccountCommand(mockCreateAccountService).handler({
        $0: '',
        _: [''],
        alias: 'abc',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new URLNotFoundError('account abc'));
  });

  it('Will fail to add alias when no key given', () => {
    expect(() =>
      addAccountCommand(mockCreateAccountService).handler({
        $0: '',
        _: [''],
        alias: 'abc',
        url: 'https://extension.example.com',
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new KeyNotFoundError('account abc'));
  });
});
