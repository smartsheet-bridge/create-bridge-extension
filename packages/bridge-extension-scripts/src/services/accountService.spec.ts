import * as dotpref from 'dotpref';
import { AuthOptions } from '../options';
import { createAccountService } from './accountService';

describe('authService', () => {
  const get = jest.fn();
  const set = jest.fn();

  jest.spyOn(dotpref, 'createPref').mockImplementation(() => ({
    get,
    set,
    filePath: '',
    read: jest.fn(),
    reset: jest.fn(),
    write: jest.fn(),
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const MOCK_PREFERENCES_NONE = {
    account: {},
  };
  const MOCK_PREFERENCES_DEFAULT = {
    account: {
      default: {
        url: 'foo',
        key: 'bar',
      },
    },
  };
  const MOCK_PREFERENCES_MULTIPLE = {
    account: {
      default: {
        url: 'foo',
        key: 'bar',
      },
      account1: {
        url: 'bar',
        key: 'baz',
      },
    },
  };

  describe('getAccount', () => {
    const { getAccount } = createAccountService();

    it.each(['default', 'account1'] as string[])(
      'given `%s`, return undefined when no preferences',
      accountName => {
        get.mockImplementation(key => MOCK_PREFERENCES_NONE[key]);
        expect(getAccount(accountName)).toEqual(undefined);
      }
    );

    it.each([
      [
        'default',
        {
          url: 'foo',
          key: 'bar',
        },
      ],
      ['account1', undefined],
    ] as Array<[string, AuthOptions]>)(
      'given `%s`, return %p when default account is stored',
      (accountName, expected) => {
        get.mockImplementation(key => MOCK_PREFERENCES_DEFAULT[key]);
        expect(getAccount(accountName)).toEqual(expected);
      }
    );

    it.each([
      [
        'default',
        {
          url: 'foo',
          key: 'bar',
        },
      ],
      [
        'account1',
        {
          url: 'bar',
          key: 'baz',
        },
      ],
    ] as Array<[string, AuthOptions]>)(
      'given `%s`, return %p when multiple accounts are stored',
      (accountName, expected) => {
        get.mockImplementation(key => MOCK_PREFERENCES_MULTIPLE[key]);
        expect(getAccount(accountName)).toEqual(expected);
      }
    );
  });

  describe('saveAccount', () => {
    const { saveAccount } = createAccountService();
    it.each([
      ['foo', 'bar', 'default'],
      ['foo', 'bar', 'account'],
    ] as Array<[string, string, string]>)(
      'given url: `%s`, key: `%s`, and account `%s` set preferences correctly',
      (url, key, alias) => {
        get.mockImplementation(k => MOCK_PREFERENCES_MULTIPLE[k]);
        saveAccount(alias, { url, key });
        expect(set).toBeCalledTimes(1);
        expect(set).toBeCalledWith('account', {
          ...MOCK_PREFERENCES_MULTIPLE.account,
          [alias || 'default']: {
            url,
            key,
          },
        });
      }
    );
    it('fails when not given key', () => {
      expect(() =>
        saveAccount('default', {
          url: 'foo',
          key: undefined,
        })
      ).toThrowError();
    });
    it('fails when not given url', () => {
      expect(() =>
        saveAccount('default', {
          url: undefined,
          key: 'foo',
        })
      ).toThrowError();
    });
  });

  describe('removeAccount', () => {
    const { removeAccount } = createAccountService();
    it('removes account without error', () => {
      get.mockImplementation(k => MOCK_PREFERENCES_MULTIPLE[k]);
      removeAccount('account1');
      expect(set).toBeCalledTimes(1);
      expect(set).toBeCalledWith('account', {
        default: MOCK_PREFERENCES_MULTIPLE.account.default,
      });
    });
  });

  describe('listAccounts', () => {
    const { listAccounts } = createAccountService();
    it('returns list of accounts without error', () => {
      get.mockImplementation(k => MOCK_PREFERENCES_MULTIPLE[k]);
      expect(listAccounts()).toEqual([
        { alias: 'default', ...MOCK_PREFERENCES_MULTIPLE.account.default },
        { alias: 'account1', ...MOCK_PREFERENCES_MULTIPLE.account.account1 },
      ]);
    });
  });
});
