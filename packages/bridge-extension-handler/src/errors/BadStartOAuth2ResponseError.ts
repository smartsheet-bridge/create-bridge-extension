import { ExtensionError } from '@smartsheet-extensions/handler';

export class BadStartOAuth2ResponseError extends ExtensionError {
  public constructor(type: string) {
    super({
      description: `Function \`onOAuthStart\` must return a \`OAuth2SetupData\` or \`StartOAuth2Response\`. Type \`${type}\` found.`,
    });
  }
}
