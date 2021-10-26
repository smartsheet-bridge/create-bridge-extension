import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { AliasNotFoundError } from '../../errors/AliasNotFoundError';
import { alias } from '../../options';
import { CreateAccountServiceFn } from '../../services/accountService';
import { CLIArguments, InferArgumentsOut } from '../../types';

type AliasArguments = InferArgumentsOut<{ alias: typeof alias }>;

const builder: CommandBuilder = yargs => {
  return yargs.positional('alias', alias).check(argv => {
    if (typeof argv.alias !== 'string') {
      throw new AliasNotFoundError(argv.alias);
    }
    return true;
  });
};

const createRemoveAccountHandler = (
  createAccountService: CreateAccountServiceFn
) => async (argv: CLIArguments<AliasArguments>) => {
  const { getAccount, removeAccount } = createAccountService();
  const account = getAccount(argv.alias);

  if (account !== undefined) {
    removeAccount(argv.alias);
    Logger.info('Removed account alias', `'${argv.alias}'`);
  } else {
    Logger.info('No account alias', `'${argv.alias}'`);
  }
};

export const createRemoveAccountCommand = (
  createAccountService: CreateAccountServiceFn
): CommandModule => ({
  command: 'remove <alias>',
  aliases: ['rm'],
  describe: 'Remove an account alias.',
  builder,
  handler: createRemoveAccountHandler(createAccountService),
});
