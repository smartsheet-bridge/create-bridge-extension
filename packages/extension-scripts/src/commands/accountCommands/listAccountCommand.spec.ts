import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { CreateAccountServiceFn } from '../../services/accountService';
import { listAccountCommand } from './listAccountCommand';

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

  it.each([[['list']], [['ls']]] as Array<[string[]]>)(
    'no accounts found with %s',
    async cmd => {
      mockListAccounts.mockReturnValue([]);
      yargs(cmd).command(listAccountCommand(mockCreateAccountService)).parse();
      expect(mockListAccounts).toBeCalledTimes(1);
      expect(spyInfo).toBeCalledWith(
        'No account aliases stored on this machine.'
      );
    }
  );

  it.each([[['list']], [['ls']]] as Array<[string[]]>)(
    'no accounts found with %s',
    async cmd => {
      mockListAccounts.mockReturnValue([
        {
          alias: 'abc',
          key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
          url: 'https://extension.example.com',
        },
      ]);
      yargs(cmd).command(listAccountCommand(mockCreateAccountService)).parse();
      expect(mockListAccounts).toBeCalledTimes(1);
      expect(spyInfo).toBeCalledWith(
        'abc',
        Chalk.cyan.underline('https://extension.example.com'),
        '********************************xxxx'
      );
    }
  );
});
