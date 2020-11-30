import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { AnyState, createPref } from 'dotpref';
import { AliasNotFoundError } from '../errors/AliasNotFoundError';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { AuthOptions } from '../options';

const debug = Logger.debug('accountService');

export interface Preferences extends AnyState {
  account: {
    [alias: string]: AuthOptions;
  };
}

export const createAccountService = () => {
  const { set, get, filePath } = createPref<Preferences>({
    defaults: { account: {} },
    name: 'com.smartsheet.bridge.extension-scripts',
  });

  debug('Preferences will be stored at', filePath);

  const saveAccount = (alias: string, { url, key }: AuthOptions) => {
    if (typeof alias !== 'string') {
      throw new AliasNotFoundError(alias);
    }
    if (typeof url !== 'string') {
      throw new URLNotFoundError(`account ${alias}`);
    }
    if (typeof key !== 'string') {
      throw new KeyNotFoundError(`account ${alias}`);
    }
    const account = get('account');
    set('account', {
      ...account,
      [alias]: {
        url,
        key,
      },
    });
  };

  const getAccount = (alias: string): AuthOptions => {
    return get('account')[alias];
  };

  const removeAccount = (alias: string): AuthOptions => {
    const { [alias]: accountToBeRemoved, ...others } = get('account');
    set('account', others);

    return get('account')[alias];
  };

  const listAccounts = () => {
    const accountMap = get('account');
    return Object.keys(accountMap).map(alias => ({
      alias,
      ...accountMap[alias],
    }));
  };

  return {
    getAccount,
    saveAccount,
    removeAccount,
    listAccounts,
  };
};
