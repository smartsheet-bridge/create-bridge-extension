import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { AliasNotFoundError } from '../../errors/AliasNotFoundError';
import { alias } from '../../options';
import { createAccountService } from '../../services/accountService';
import { CLIArguments, InferArgumentsOut } from '../../types';

type aliasArguments = InferArgumentsOut<{ alias: typeof alias }>;

const builder: CommandBuilder = yargs => {
  return yargs.positional('alias', alias);
};

const handler = async (argv: CLIArguments<aliasArguments>) => {
  try {
    if (typeof argv.alias !== 'string') {
      throw new AliasNotFoundError(argv.alias);
    }

    const { getAccount, removeAccount } = createAccountService();
    const account = getAccount(argv.alias);

    if (account !== undefined) {
      removeAccount(argv.alias);
      Logger.info('Removed account alias', `'${argv.alias}'`);
    } else {
      Logger.info('No account alias', `'${argv.alias}'`);
    }
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
};

export const removeAccountCommand: CommandModule = {
  command: 'remove <alias>',
  aliases: ['rm'],
  describe: 'Remove an account alias.',
  builder,
  handler,
};
