import { Arguments as YargsArgs } from 'yargs';

export interface CLIArgumentsBase {
  include?: string;
  exclude?: string | string[];
  symlinks?: boolean;
  specFile?: string;
}

export type CLIArguments<CommandArguments extends {} = {}> = YargsArgs<
  CommandArguments & CLIArgumentsBase
>;
