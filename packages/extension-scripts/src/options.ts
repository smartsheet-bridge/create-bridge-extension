import { upperCase } from 'lodash';
import { InferredOptionTypes } from 'yargs';
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

const options = {
  loglevel,
  debug,
};

export type CLIOptions = typeof options;

export type CLIArguments = InferredOptionTypes<CLIOptions>;

export default options;
