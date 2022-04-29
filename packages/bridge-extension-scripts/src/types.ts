import {
  Arguments as YargsArgs,
  InferredOptionType,
  Options,
  PositionalOptions,
} from 'yargs';
import type { AccountConfig } from './commands/accountCommand';
import type { BuildConfig, DeployConfig } from './commands/deployCommand';
import type { LogsConfig } from './commands/logsCommand';
import type { RevokeConfig } from './commands/revokeCommand';
import type { CLICommonArguments } from './options';

export const createOption = (option: any) => {
  return option;
};

export type InferArgumentOut<
  O extends Options | PositionalOptions
> = O extends { coerce: (arg: any) => infer T } ? T : InferredOptionType<O>;

export type InferArgumentIn<O extends Options | PositionalOptions> = O extends {
  coerce: (arg: infer T) => any;
}
  ? T
  : InferredOptionType<O>;

export type InferArgumentsOut<O extends { [key: string]: Options }> = {
  [key in keyof O]: InferArgumentOut<O[key]>;
};
export type InferArgumentsIn<O extends { [key: string]: Options }> = {
  [key in keyof O]: InferArgumentIn<O[key]>;
};

export type CLIArguments<CommandArguments extends {} = {}> = YargsArgs<
  CommandArguments & CLICommonArguments
>;

export type CLIConfig = Partial<
  CLICommonArguments &
    BuildConfig &
    DeployConfig &
    LogsConfig &
    RevokeConfig &
    AccountConfig
>;
