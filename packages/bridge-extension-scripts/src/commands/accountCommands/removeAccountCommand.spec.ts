import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { CreateAccountServiceFn } from '../../services/accountService';
import { createRemoveAccountCommand } from './removeAccountCommand';

jest.spyOn(console, 'error').mockImplementation(() => {});
const COMMAND_ALIASES = ['remove', 'rm'];
const spyInfo = jest.spyOn(Logger, 'info');
const spyError = jest.spyOn(Logger, 'error');
const mockRemoveAccount = jest.fn();
const mockGetAccount = jest.fn();
const mockCreateAccountService: CreateAccountServiceFn = () => {
  return ({
    getAccount: mockGetAccount,
    removeAccount: mockRemoveAccount,
  } as unknown) as ReturnType<CreateAccountServiceFn>;
};

afterEach(() => {
  jest.clearAllMocks();
  mockRemoveAccount.mockReset();
  mockGetAccount.mockReset();
});
afterAll(() => {
  jest.restoreAllMocks();
});

describe.each(COMMAND_ALIASES)('removeAccountCommand %s', cmd => {
  it('Will remove alias successfully', () => {
    mockGetAccount.mockReturnValue({
      url: 'https://existing.example.com',
      key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
    });
    expect(() =>
      yargs([cmd, 'abc'])
        .command(createRemoveAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockRemoveAccount).toBeCalledTimes(1);
    expect(mockRemoveAccount).toBeCalledWith('abc');
    expect(spyInfo).toBeCalledWith('Removed account alias', `'abc'`);
  });

  it("Will not remove alias if it doesn't exit", () => {
    expect(() =>
      yargs([cmd, 'abc'])
        .command(createRemoveAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockRemoveAccount).toBeCalledTimes(0);
    expect(spyInfo).toBeCalledWith('No account alias', `'abc'`);
  });

  it('Will fail to remove alias when no alias given', () => {
    expect(() =>
      yargs([cmd])
        .command(createRemoveAccountCommand(mockCreateAccountService))
        .exitProcess(false)
        .parse()
    ).toThrow();
  });
});
