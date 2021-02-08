import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { CreateAccountServiceFn } from '../../services/accountService';
import { accountCommand } from '../accountCommand';

const ARG_LISTS = [
  [
    ['account', 'list'],
    ['user', 'ls'],
  ],
];

const spyInfo = jest.spyOn(Logger, 'info');
const mockListAccounts = jest.fn();
const mockCreateAccountService: CreateAccountServiceFn = () => {
  return ({
    listAccounts: mockListAccounts,
  } as unknown) as ReturnType<CreateAccountServiceFn>;
};

describe('listAccountCommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.each(ARG_LISTS)('no accounts found with %s', async cmd => {
    mockListAccounts.mockReturnValue([]);
    expect(() =>
      yargs(cmd).command(accountCommand(mockCreateAccountService)).parse()
    ).not.toThrow();
    expect(mockListAccounts).toBeCalledTimes(1);
    expect(spyInfo).toBeCalledWith(
      'No account aliases stored on this machine.'
    );
  });

  it.each(ARG_LISTS)('One account found with %s', async cmd => {
    mockListAccounts.mockReturnValue([
      {
        alias: 'abc',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        url: 'https://extension.example.com',
      },
    ]);
    expect(() =>
      yargs(cmd).command(accountCommand(mockCreateAccountService)).parse()
    ).not.toThrow();
    expect(mockListAccounts).toBeCalledTimes(1);
    expect(spyInfo).toBeCalledWith(
      'abc',
      Chalk.cyan.underline('https://extension.example.com'),
      '********************************xxxx'
    );
  });

  it.each(ARG_LISTS)('Two accounts found with %s', async cmd => {
    mockListAccounts.mockReturnValue([
      {
        alias: 'abc',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        url: 'https://extension1.example.com',
      },
      {
        alias: 'def',
        key: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyy-yyyyyy',
        url: 'https://extension2.example.com',
      },
    ]);
    expect(() =>
      yargs(cmd).command(accountCommand(mockCreateAccountService)).parse()
    ).not.toThrow();
    expect(mockListAccounts).toBeCalledTimes(1);
    expect(spyInfo).toHaveBeenNthCalledWith(
      1,
      'abc',
      Chalk.cyan.underline('https://extension1.example.com'),
      '********************************xxxx'
    );
    expect(spyInfo).toHaveBeenNthCalledWith(
      2,
      'def',
      Chalk.cyan.underline('https://extension2.example.com'),
      '********************************yyyy'
    );
  });
});
