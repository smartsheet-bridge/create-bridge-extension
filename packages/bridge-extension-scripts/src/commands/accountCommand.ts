import { CommandBuilder, CommandModule } from 'yargs';
import { alias, key, url } from '../options';
import { CreateAccountServiceFn } from '../services/accountService';
import type { InferArgumentsIn } from '../types';
import { createAddAccountCommand } from './accountCommands/addAccountCommand';
import { createListAccountCommand } from './accountCommands/listAccountCommand';
import { createRemoveAccountCommand } from './accountCommands/removeAccountCommand';

const accountArguments = {
  url,
  key,
  alias,
};

export type AccountConfig = InferArgumentsIn<typeof accountArguments>;

const createAccountBuilder = (
  createAccountService: CreateAccountServiceFn
): CommandBuilder => yargs => {
  return yargs
    .command(createListAccountCommand(createAccountService))
    .command(createAddAccountCommand(createAccountService))
    .command(createRemoveAccountCommand(createAccountService))
    .demandCommand()
    .recommendCommands()
    .help();
};

const handler = async () => {};

export const createAccountCommand = (
  createAccountService: CreateAccountServiceFn
): CommandModule => ({
  command: 'account',
  aliases: ['alias', 'user'],
  describe: 'Manage your saved account aliases.',
  builder: createAccountBuilder(createAccountService),
  handler,
});
