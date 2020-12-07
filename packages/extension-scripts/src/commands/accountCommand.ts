import { CommandBuilder, CommandModule } from 'yargs';
import { alias, key, url } from '../options';
import { CreateAccountServiceFn } from '../services/accountService';
import type { InferArgumentsIn } from '../types';
import { addAccountCommand } from './accountCommands/addAccountCommand';
import { listAccountCommand } from './accountCommands/listAccountCommand';
import { removeAccountCommand } from './accountCommands/removeAccountCommand';

const accountArguments = {
  url,
  key,
  alias,
};

export type AccountConfig = InferArgumentsIn<typeof accountArguments>;

const builder = (
  createAccountService: CreateAccountServiceFn
): CommandBuilder => yargs => {
  return yargs
    .command(listAccountCommand(createAccountService))
    .command(addAccountCommand(createAccountService))
    .command(removeAccountCommand(createAccountService))
    .demandCommand()
    .recommendCommands()
    .help();
};

const handler = async () => {};

export const accountCommand = (
  createAccountService: CreateAccountServiceFn
): CommandModule => ({
  command: 'account',
  aliases: ['alias', 'user'],
  describe: 'Manage your saved account aliases.',
  builder: builder(createAccountService),
  handler,
});
