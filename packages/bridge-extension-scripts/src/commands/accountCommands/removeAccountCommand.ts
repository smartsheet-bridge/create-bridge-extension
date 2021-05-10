import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { AliasNotFoundError } from '../../errors/AliasNotFoundError';
import { alias } from '../../options';
import { CreateAccountServiceFn } from '../../services/accountService';
import { CLIArguments, InferArgumentsOut } from '../../types';

type AliasArguments = InferArgumentsOut<{ alias: typeof alias }>;

const builder: CommandBuilder = yargs => {
  return yargs.positional('alias', alias);
};

const handler = (createAccountService: CreateAccountServiceFn) => async (
  argv: CLIArguments<AliasArguments>
) => {
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
  }
};

export const removeAccountCommand = (
  createAccountService: CreateAccountServiceFn
): CommandModule => ({
  command: 'remove <alias>',
  aliases: ['rm'],
  describe: 'Remove an account alias.',
  builder,
  handler: handler(createAccountService),
});
