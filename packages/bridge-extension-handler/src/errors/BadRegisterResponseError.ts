import { ExtensionError } from '@smartsheet-extensions/handler';

export class BadRegisterResponseError extends ExtensionError {
  public constructor(type: string) {
    super({
      description: `Function \`onRegister\` must return an object or \`RegisterResponse\`. Type \`${type}\` found.`,
    });
  }
}
