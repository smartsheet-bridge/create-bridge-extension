import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { CreateAccountServiceFn } from '../../services/accountService';
import { createListAccountCommand } from './listAccountCommand';

const COMMAND_ALIASES = ['list', 'ls'];

const spyInfo = jest.spyOn(Logger, 'info');
const mockListAccounts = jest.fn();
const mockCreateAccountService: CreateAccountServiceFn = () => {
  return ({
    listAccounts: mockListAccounts,
  } as unknown) as ReturnType<CreateAccountServiceFn>;
};

afterEach(() => {
  jest.clearAllMocks();
  mockListAccounts.mockReset();
});
afterAll(() => {
  jest.restoreAllMocks();
});

describe.each(COMMAND_ALIASES)('listAccountCommand %s', cmd => {
  it('no accounts found with %s', async () => {
    mockListAccounts.mockReturnValue([]);
    expect(() =>
      yargs([cmd])
        .command(createListAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(mockListAccounts).toBeCalledTimes(1);
    expect(spyInfo).toBeCalledWith(
      'No account aliases stored on this machine.'
    );
  });

  it('One account found with %s', async () => {
    mockListAccounts.mockReturnValue([
      {
        alias: 'abc',
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
        url: 'https://extension.example.com',
      },
    ]);
    expect(() =>
      yargs([cmd])
        .command(createListAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(mockListAccounts).toBeCalledTimes(1);
    expect(spyInfo).toBeCalledWith(
      'abc',
      Chalk.cyan.underline('https://extension.example.com'),
      '********************************xxxx'
    );
  });

  it('Two accounts found with %s', async () => {
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
      yargs([cmd])
        .command(createListAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
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
