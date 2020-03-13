import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { CLI_PREFIX } from '../types';

export class URLNotFoundError extends UserError {
  public constructor(cmd = '[cmd]') {
    super(
      `Parameter 'url' not found!`,
      `Please provide your ${Chalk.green('Bridge URL')} using the ${Chalk.cyan(
        '--url'
      )} parameter.`,
      {
        examples: [
          `extension-scripts ${cmd} --url=${Chalk.cyan(
            '[insert Bridge URL here]'
          )}`,
          `${CLI_PREFIX.toLocaleUpperCase()}_URL=${Chalk.cyan(
            '[insert Bridge URL here]'
          )} extension-scripts ${cmd}`,
        ],
      }
    );
  }
}
