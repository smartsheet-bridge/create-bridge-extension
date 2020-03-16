import { Arguments as YargsArgs } from 'yargs';

export interface CLIArgumentsBase {
  include?: string;
  exclude?: string | string[];
  symlinks?: boolean;
  specificationFile?: string;
}

export type CLIArguments<CommandArguments extends {} = {}> = YargsArgs<
  CommandArguments & CLIArgumentsBase
>;
