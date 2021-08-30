import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandModule } from 'yargs';
import { CreateAccountServiceFn } from '../../services/accountService';
import { maskKey } from '../../utils';

const createListCommandHandler = (
  createAccountService: CreateAccountServiceFn
) => async () => {
  const { listAccounts } = createAccountService();
  const accounts = listAccounts();

  if (accounts.length > 0) {
    accounts.forEach(account => {
      Logger.info(
        account.alias,
        Chalk.cyan.underline(account.url),
        maskKey(account.key)
      );
    });
  } else {
    Logger.info('No account aliases stored on this machine.');
  }
};

export const createListAccountCommand = (
  createAccountService: CreateAccountServiceFn
): CommandModule => ({
  command: 'list',
  aliases: ['ls'],
  describe: 'List all account aliases.',
  handler: createListCommandHandler(createAccountService),
});
