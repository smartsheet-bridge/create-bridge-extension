import { ExtensionError } from '@smartsheet-extensions/handler';

export class BadExternalResponseError extends ExtensionError {
  public constructor(func: string, type: string) {
    super({
      description: `Function \`${func}\` must return a \`ExternalResponse\`, \`HttpResponse\`, and array of, or single, \`ChannelOutput\`. Type \`${type}\` found.`,
    });
  }
}
