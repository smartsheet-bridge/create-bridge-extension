import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';
import { LOGLEVEL_OPTIONS, RC_NAME } from '../options';

export class LoglevelNotRecognized extends UserError {
  public constructor(lvl: string) {
    super(
      `Failed to parse ${Chalk.green(`loglevel`)} '${Chalk.cyan(`${lvl}`)}'`,
      `Please choose one of ${Chalk.cyan(LOGLEVEL_OPTIONS.join(', '))}.`,
      {
        items: [
          `extension-scripts [cmd] --loglevel ${Chalk.cyan(`info`)}`,
          `extension-scripts [cmd] -l ${Chalk.cyan(`info`)}`,
          `${RC_NAME.toLocaleUpperCase()}_LOGLEVEL=${Chalk.cyan(
            `info`
          )} extension-scripts [cmd]`,
        ],
      }
    );
  }
}
