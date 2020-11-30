import { CommandBuilder, CommandModule } from 'yargs';
import { alias, key, url } from '../options';
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

const builder: CommandBuilder = yargs => {
  return yargs
    .command(listAccountCommand)
    .command(addAccountCommand)
    .command(removeAccountCommand)
    .demandCommand()
    .recommendCommands()
    .help();
};

const handler = async () => {};

export const accountCommand: CommandModule = {
  command: 'account',
  aliases: ['alias', 'user'],
  describe: 'Manage your saved account aliases.',
  builder,
  handler,
};
