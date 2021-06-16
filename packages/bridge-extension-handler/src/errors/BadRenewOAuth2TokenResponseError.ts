import { ExtensionError } from '@smartsheet-extensions/handler';

export class BadRenewOAuth2TokenResponseError extends ExtensionError {
  public constructor(type: string) {
    super({
      description: `Function \`onOAuthRenewToken\` must return a \`OAuth2Data\` or \`RenewOAuth2TokenResponse\`. Type \`${type}\` found.`,
    });
  }
}
