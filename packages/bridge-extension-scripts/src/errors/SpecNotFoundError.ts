import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';

export class SpecNotFoundError extends UserError {
  public constructor(filename: string, path: string = process.cwd()) {
    super(
      `Extension specification not found!`,
      `The ${filename} file was not found at path ${Chalk.cyan(path)}.`
    );
  }
}
