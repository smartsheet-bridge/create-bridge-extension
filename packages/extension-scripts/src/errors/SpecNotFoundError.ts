import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';

export class SpecNotFoundError extends UserError {
  public constructor(path = process.cwd()) {
    super(
      `Extension specification not found!`,
      `The extension specification file was not found at path ${Chalk.cyan(
        path
      )}.`
    );
  }
}
