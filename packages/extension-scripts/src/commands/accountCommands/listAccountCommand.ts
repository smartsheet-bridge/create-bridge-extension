import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandModule } from 'yargs';
import { createAccountService } from '../../services/accountService';
import { CLIArguments } from '../../types';
import { maskKey } from '../../utils';

const handler = async (argv: CLIArguments) => {
  try {
    const { listAccounts } = createAccountService();
    const accounts = listAccounts();

    if (accounts.length > 0) {
      accounts.map(account => {
        Logger.info(
          account.alias,
          Chalk.cyan.underline(account.url),
          maskKey(account.key)
        );
      });
    } else {
      Logger.info('No account aliases stored on this machine.');
    }
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const listAccountCommand: CommandModule = {
  command: 'list',
  aliases: ['ls'],
  describe: 'List all account aliases.',
  handler,
};
