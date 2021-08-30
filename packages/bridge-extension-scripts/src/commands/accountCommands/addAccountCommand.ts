import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { CommandBuilder, CommandModule } from 'yargs';
import { AliasAlreadyExistsError } from '../../errors/AliasAlreadyExistsError';
import { KeyNotFoundError } from '../../errors/KeyNotFoundError';
import { URLNotFoundError } from '../../errors/URLNotFoundError';
import { alias, key, url } from '../../options';
import { CreateAccountServiceFn } from '../../services/accountService';
import { CLIArguments, InferArgumentsOut } from '../../types';

const addAccountArguments = {
  url,
  key,
  overwrite: {
    type: 'boolean' as 'boolean',
    description: 'Overwrite any existing alias.',
    default: false,
    coerce: (o?: boolean) => (o !== undefined ? o : false),
  },
};

type AddAccountArguments = InferArgumentsOut<
  typeof addAccountArguments & { alias: typeof alias }
>;

const createAddAccountBuilder = (
  createAccountService: CreateAccountServiceFn
): CommandBuilder => yargs => {
  return yargs
    .positional('alias', alias)
    .options(addAccountArguments)
    .check(argv => {
      if (typeof argv.url !== 'string') {
        throw new URLNotFoundError(`account ${argv.alias}`);
      }
      if (typeof argv.key !== 'string') {
        throw new KeyNotFoundError(`account ${argv.alias}`);
      }
      const { getAccount } = createAccountService();
      const account = getAccount(argv.alias);

      if (account !== undefined && argv.overwrite !== true) {
        throw new AliasAlreadyExistsError(argv.alias);
      }
      return true;
    });
};

const createAddAccountHandler = (
  createAccountService: CreateAccountServiceFn
) => async (argv: CLIArguments<AddAccountArguments>) => {
  const { saveAccount } = createAccountService();

  saveAccount(argv.alias, {
    key: argv.key,
    url: argv.url,
  });

  Logger.info(
    'Added account alias',
    `'${argv.alias}'`,
    Chalk.cyan.underline(argv.url)
  );
};

export const createAddAccountCommand = (
  createAccountService: CreateAccountServiceFn
): CommandModule => ({
  command: 'add [alias]',
  aliases: ['a'],
  describe: 'Add or overwrite account alias.',
  builder: createAddAccountBuilder(createAccountService),
  handler: createAddAccountHandler(createAccountService),
});
