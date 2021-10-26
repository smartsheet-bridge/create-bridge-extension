import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { RC_NAME } from '../options';

export class KeyNotFoundError extends UserError {
  public constructor(cmd = '[cmd]') {
    super(
      `Parameter 'key' not found!`,
      `Please provide your ${Chalk.green(
        'Bridge API key'
      )} using the ${Chalk.cyan('--key')} parameter.`,
      {
        items: [
          `extension-scripts ${cmd} --key=${Chalk.cyan(
            '[insert Bridge API key here]'
          )}`,
          `${RC_NAME.toLocaleUpperCase()}_KEY=${Chalk.cyan(
            '[insert Bridge API key here]'
          )} extension-scripts ${cmd}`,
        ],
      }
    );
  }
}
