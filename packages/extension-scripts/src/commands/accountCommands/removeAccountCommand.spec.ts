import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import yargs from 'yargs';
import { AliasNotFoundError } from '../../errors/AliasNotFoundError';
import { CreateAccountServiceFn } from '../../services/accountService';
import { accountCommand } from '../accountCommand';
import { removeAccountCommand } from './removeAccountCommand';

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

describe('removeAccountCommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockGetAccount.mockReset();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Will remove alias successfully', () => {
    mockGetAccount.mockReturnValue({
      url: 'https://existing.example.com',
      key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxx-xxxxxx',
    });
    expect(() =>
      yargs(['account', 'remove', 'abc'])
        .command(accountCommand(mockCreateAccountService))
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockRemoveAccount).toBeCalledTimes(1);
    expect(mockRemoveAccount).toBeCalledWith('abc');
    expect(spyInfo).toBeCalledWith('Removed account alias', `'abc'`);
  });

  it("Will not remove alias if it doesn't exit", () => {
    expect(() =>
      yargs(['alias', 'remove', 'abc'])
        .command(accountCommand(mockCreateAccountService))
        .parse()
    ).not.toThrow();
    expect(spyError).not.toHaveBeenCalled();
    expect(mockRemoveAccount).toBeCalledTimes(0);
    expect(spyInfo).toBeCalledWith('No account alias', `'abc'`);
  });

  it('Will fail to remove alias when no alias given', () => {
    expect(() =>
      removeAccountCommand(mockCreateAccountService).handler({
        $0: '',
        _: [''],
      })
    ).not.toThrow();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toBeCalledWith(new AliasNotFoundError());
  });
});
