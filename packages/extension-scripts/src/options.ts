import { upperCase } from 'lodash';
import { InferredOptionTypes, Options } from 'yargs';
import { CLI_PREFIX } from './types';

export const ENV_LOGLEVEL = `${CLI_PREFIX}_LOGLEVEL`;

const loglevel = {
  alias: 'l',
  global: true,
  describe: 'Level of output logs',
  default: 'INFO',
  choices: ['INFO', 'VERBOSE', 'WARN', 'ERROR', 'SILENT'],
  coerce: (lvl: string) => upperCase(lvl),
};

const debug = {
  alias: 'd',
  global: true,
  describe: 'Regex pattern to match debug logs by',
  default: '',
  coerce: (d: string) => (d === '' ? undefined : d),
};

export const url: Options = {
  type: 'string',
  describe: 'URL of your Bridge by Smartsheet account.',
  default: undefined,
};

export const key: Options = {
  type: 'string',
  describe: 'Authorized API key for you Bridge by Smartsheet account.',
  default: undefined,
};

const options = {
  loglevel,
  debug,
};

export type CLIOptions = typeof options;

export type CLIArguments = InferredOptionTypes<CLIOptions>;

export default options;
