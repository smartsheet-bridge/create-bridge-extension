import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';

export class AliasAlreadyExistsError extends UserError {
  public constructor(alias = 'default') {
    super(
      `Account alias '${alias}' already exists!`,
      `To overwrite use the ${Chalk.cyan('--overwrite')} parameter.`,
      {
        items: [
          `extension-scripts account add ${alias} ${Chalk.cyan('--overwrite')}`,
          `extension-scripts alias add ${alias} ${Chalk.cyan('--overwrite')}`,
          `extension-scripts user add ${alias} ${Chalk.cyan('--overwrite')}`,
        ],
      }
    );
  }
}
