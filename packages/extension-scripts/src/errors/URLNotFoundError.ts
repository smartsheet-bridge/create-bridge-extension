import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { RC_NAME } from '..';

export class URLNotFoundError extends UserError {
  public constructor(cmd = '[cmd]') {
    super(
      `Parameter 'url' not found!`,
      `Please provide your ${Chalk.green('Bridge URL')} using the ${Chalk.cyan(
        '--url'
      )} parameter.`,
      {
        items: [
          `extension-scripts ${cmd} --url=${Chalk.cyan(
            '[insert Bridge URL here]'
          )}`,
          `${RC_NAME.toLocaleUpperCase()}_URL=${Chalk.cyan(
            '[insert Bridge URL here]'
          )} extension-scripts ${cmd}`,
        ],
      }
    );
  }
}
