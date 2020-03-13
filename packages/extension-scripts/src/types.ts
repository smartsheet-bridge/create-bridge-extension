import { Arguments as YargsArgs } from 'yargs';

export const CLI_PREFIX = 'extension';

export interface CLIEntriesMap {
  [entry: string]: string | string[];
}

export interface CLIConfigBase<Entries extends CLIEntriesMap> {
  rootFolder: string;
  outputFolder: string;
  tsconfig: string;
  entries: Entries;
  entry: string;
  include?: string;
  exclude?: string | string[];
  symlinks?: boolean;
  specificationFile?: string;
}

export type CLIConfig<
  Entries extends CLIEntriesMap = {},
  Ext extends {} = {}
> = CLIConfigBase<Entries> & Ext;

export type CLIArguments<
  Entries extends CLIEntriesMap = {},
  Ext extends {} = {}
> = YargsArgs<CLIConfig<Entries, Ext>>;
