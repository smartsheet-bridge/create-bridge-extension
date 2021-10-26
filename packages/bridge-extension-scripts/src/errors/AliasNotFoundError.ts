import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';

export class AliasNotFoundError extends UserError {
  public constructor(alias = 'default') {
    super(
      `Account alias '${alias}' not found!`,
      `Please provide a valid ${Chalk.green('Bridge account alias')}.`
    );
  }
}
