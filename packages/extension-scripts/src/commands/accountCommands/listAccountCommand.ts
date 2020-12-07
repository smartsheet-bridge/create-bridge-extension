import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { json } from '../../options';
import { createAccountService } from '../../services/accountService';
import { CLIArguments, InferArgumentsOut } from '../../types';
import { maskKey } from '../../utils';

const listAccountArguments = {
  json,
};

type ListAccountArguments = InferArgumentsOut<typeof listAccountArguments>;

const builder: CommandBuilder = yargs => {
  return yargs.options(listAccountArguments);
};

const handler = async (argv: CLIArguments<ListAccountArguments>) => {
  try {
    const { listAccounts } = createAccountService();
    const accounts = listAccounts();

    if (accounts.length > 0) {
      if (argv.json) {
        console.log(JSON.stringify(accounts));
      } else {
        accounts.forEach(account => {
          Logger.info(
            account.alias,
            Chalk.cyan.underline(account.url),
            maskKey(account.key)
          );
        });
      }
    } else if (argv.json) {
      console.log(JSON.stringify([]));
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
  builder,
  handler,
};
