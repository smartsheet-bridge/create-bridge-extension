import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { CLI_PREFIX } from '../types';

export class KeyNotFoundError extends UserError {
  public constructor(cmd = '[cmd]') {
    super(
      `Parameter 'key' not found!`,
      `Please provide your ${Chalk.green(
        'Bridge API key'
      )} using the ${Chalk.cyan('--key')} parameter.`,
      {
        examples: [
          `extension-scripts ${cmd} --key=${Chalk.cyan(
            '[insert Bridge API key here]'
          )}`,
          `${CLI_PREFIX.toLocaleUpperCase()}_KEY=${Chalk.cyan(
            '[insert Bridge API key here]'
          )} extension-scripts ${cmd}`,
        ],
      }
    );
  }
}
