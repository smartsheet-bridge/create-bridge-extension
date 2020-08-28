import {
  Arguments as YargsArgs,
  InferredOptionType,
  Options,
  PositionalOptions,
} from 'yargs';
import { AccountConfig } from './commands/accountCommand';
import { DeployConfig } from './commands/deployCommand';
import { LogsConfig } from './commands/logsCommand';
import { RevokeConfig } from './commands/revokeCommand';
import { CLICommonArguments } from './options';

export const createOption = <O = {}>(option: any) => {
  return option;
};

export type InferArgumentOut<
  O extends Options | PositionalOptions
> = O extends { coerce: (arg: any) => infer T } ? T : InferredOptionType<O>;

export type InferArgumentIn<O extends Options | PositionalOptions> = O extends {
  coerce: (arg: infer T) => infer U;
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
  CLICommonArguments & DeployConfig & LogsConfig & RevokeConfig & AccountConfig
>;
