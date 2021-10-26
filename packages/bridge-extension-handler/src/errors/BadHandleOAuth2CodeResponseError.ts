import { ExtensionError } from '@smartsheet-extensions/handler';

export class BadHandleOAuth2CodeResponseError extends ExtensionError {
  public constructor(type: string) {
    super({
      description: `Function \`onOAuthHandleCode\` must return a \`OAuth2Data\` or \`HandleOAuth2CodeResponse\`. Type \`${type}\` found.`,
    });
  }
}
