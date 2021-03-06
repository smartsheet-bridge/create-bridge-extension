import { parseAccountURL } from '@smartsheet-bridge/bridge-sdk';
import { InferredOptionTypes } from 'yargs';

export const RC_NAME = `extension`;
export const LOGLEVEL_OPTIONS = ['info', 'verbose', 'warn', 'error', 'silent'];

const loglevel = {
  alias: 'l',
  global: true,
  description: 'Level of output logs',
  default: 'info',
  choices: LOGLEVEL_OPTIONS,
};

const debug = {
  alias: 'd',
  global: true,
  description: 'Regex pattern to match debug logs by',
  default: '',
  coerce: (d: string) => (d === '' ? undefined : d),
};

const options = {
  loglevel,
  debug,
};

export type AuthOptions = InferredOptionTypes<{
  url: typeof url;
  key: typeof key;
}>;

export type CLICommonArguments = InferredOptionTypes<typeof options>;

export default options;

export const urlCoerce = (urlInput: string) => {
  const { protocol, accountName, hostName } = parseAccountURL(urlInput);
  return `${protocol}://${accountName}.${hostName}`;
};

export const url = {
  type: 'string' as 'string',
  describe: 'URL of your Bridge by Smartsheet account.',
  coerce: urlCoerce,
};

export const key = {
  type: 'string' as 'string',
  describe: 'Authorized API key for you Bridge by Smartsheet account.',
};

export const alias = {
  type: 'string' as 'string',
  default: 'default',
  describe: 'Account aliases for URLs and KEYs.',
};

export const specFile = {
  global: true,
  default: 'extension.json',
  description: 'Filename of extension specification file.',
};

export const extension = {
  description:
    'The name of the extension to revoke. Defaults to current working directory.',
  type: 'string' as 'string',
};

export const include = {
  type: 'string' as 'string',
  default: '**/**',
  description: 'Pattern to include filenames when packaging extension.',
};

export const exclude = {
  type: 'string' as 'string',
  description:
    'Pattern or array of patterns to exclude filenames when packaging extension.',
  default: '',
  coerce: (excl: string | string[]) => ([] as string[]).concat(excl || []),
};
