import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { CLI_PREFIX } from '../types';

export class HostNotFoundError extends UserError {
  public constructor(cmd = '[cmd]') {
    super(
      `Parameter 'host' not found!`,
      `Please provide your ${Chalk.green('Bridge URL')} using the ${Chalk.cyan(
        '--host'
      )} parameter.`,
      {
        examples: [
          `extension-scripts ${cmd} --host=${Chalk.cyan(
            '[insert Bridge URL here]'
          )}`,
          `${CLI_PREFIX.toLocaleUpperCase()}_HOST=${Chalk.cyan(
            '[insert Bridge URL here]'
          )} extension-scripts ${cmd}`,
        ],
      }
    );
  }
}
