import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { CLI_PREFIX } from '../types';

export class AuthNotFoundError extends UserError {
  public constructor(cmd = '[cmd]') {
    super(
      `Parameter 'auth' not found!`,
      `Please provide your ${Chalk.green(
        'Bridge API key'
      )} using the ${Chalk.cyan('--auth')} parameter.`,
      {
        examples: [
          `extension-scripts ${cmd} --auth=${Chalk.cyan(
            '[insert Bridge API key here]'
          )}`,
          `${CLI_PREFIX.toLocaleUpperCase()}_AUTH=${Chalk.cyan(
            '[insert Bridge API key here]'
          )} extension-scripts ${cmd}`,
        ],
      }
    );
  }
}
