import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { InferredOptionTypes, MiddlewareFunction } from 'yargs';
import { KeyNotFoundError } from '../errors/KeyNotFoundError';
import { URLNotFoundError } from '../errors/URLNotFoundError';
import { alias as aliasOption, AuthOptions } from '../options';
import { createAccountService } from '../services/accountService';
import { CLIArguments } from '../types';
import { maskKey } from '../utils';

export const middlewareAuth: MiddlewareFunction<CLIArguments<
  Partial<AuthOptions & InferredOptionTypes<{ alias: typeof aliasOption }>>
>> = argv => {
  if (argv.alias) {
    Logger.verbose('Account alias:', Chalk.cyan(argv.alias));
  } else {
    Logger.verbose('No account alias given');
  }

  const { getAccount } = createAccountService();
  const account = getAccount(argv.alias || 'default');
  const { url, key } = argv;

  argv.url = url || (account && account.url);
  argv.key = key || (account && account.key);

  if (typeof argv.url === 'string') {
    Logger.verbose('Account url:', Chalk.cyan(argv.url));
  } else {
    throw new URLNotFoundError(argv._[0]);
  }
  if (typeof argv.key === 'string') {
    Logger.verbose('Account key:', Chalk.cyan(maskKey(argv.key)));
  } else {
    throw new KeyNotFoundError(argv._[0]);
  }
};
