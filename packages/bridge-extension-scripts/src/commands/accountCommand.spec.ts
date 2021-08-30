import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { CreateAccountServiceFn } from '../services/accountService';
import { createAccountCommand } from './accountCommand';

const COMMAND_ALIASES = ['account', 'alias', 'user'];

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

describe.each(COMMAND_ALIASES)('accountCommand %s', cmd => {
  it('no accounts found with %s list', async () => {
    mockListAccounts.mockReturnValue([]);
    expect(() =>
      yargs([cmd, 'list'])
        .command(createAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(mockListAccounts).toBeCalledTimes(1);
    expect(spyInfo).toBeCalledWith(
      'No account aliases stored on this machine.'
    );
  });
});
