import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';

export class EnvParserError extends UserError {
  public constructor(entry: string) {
    super(
      `Failed to parse '${Chalk.green(`--env=${entry}`)}'`,
      `Please provide your environment variables in the correct format.`,
      {
        items: [
          `--env=${Chalk.cyan('KEY_A:VALUE_1 KEY_B:VALUE_2')}`,
          `--env=${Chalk.cyan('KEY_A:VALUE_1')} --env=${Chalk.cyan(
            'KEY_B:VALUE_2'
          )}`,
        ],
      }
    );
  }
}
