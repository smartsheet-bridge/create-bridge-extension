import { InferredOptionTypes } from 'yargs';

const loglevel = {
  alias: 'l',
  global: true,
  description: 'Level of output logs',
  default: 'INFO',
  choices: ['INFO', 'VERBOSE', 'WARN', 'ERROR', 'SILENT'],
  coerce: (lvl: string) => lvl.toUpperCase(),
};

const debug = {
  alias: 'd',
  global: true,
  description: 'Regex pattern to match debug logs by',
  default: '',
  coerce: (d: string) => (d === '' ? undefined : d),
};

const specFile = {
  global: true,
  default: 'extension.json',
  description: 'Filename of extension specification file.',
};

const options = {
  loglevel,
  debug,
  specFile,
};

export type CLICommonArguments = InferredOptionTypes<typeof options>;

export default options;

export const url = {
  type: 'string' as 'string',
  describe: 'URL of your Bridge by Smartsheet account.',
};

export const key = {
  type: 'string' as 'string',
  describe: 'Authorized API key for you Bridge by Smartsheet account.',
};
