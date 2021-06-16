import {
  ExtensionResponse,
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

export interface HandleOAuth2CodeResponse extends ExtensionResponse {
  access_token: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  grant_type?: string;
  metadata?: Record<string, string>;
  redirectMessage?: string;
  redirectTo?: string;
  settings?: SerializableObject;
}

export class HandleOAuth2CodeResponse
  extends AbstractResponse
  implements SerializableClass {
  access_token: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  grant_type?: string;
  metadata?: Record<string, string>;
  redirectMessage?: string;
  redirectTo?: string;
  settings?: SerializableObject;

  public static create(props: Partial<HandleOAuth2CodeResponse> = {}) {
    return new HandleOAuth2CodeResponse(props);
  }

  public constructor({
    status,
    access_token,
    token_type,
    refresh_token,
    expires_in,
    grant_type,
    metadata,
    redirectMessage,
    redirectTo,
    settings,
  }: Partial<HandleOAuth2CodeResponse> = {}) {
    super(status);
    if (access_token) this.setAccessToken(access_token);
    if (token_type) this.setTokenType(token_type);
    if (refresh_token) this.setRefreshToken(refresh_token);
    if (expires_in) this.setExpiresIn(expires_in);
    if (grant_type) this.setGrantType(grant_type);
    if (metadata) this.setMetadata(metadata);
    if (redirectMessage) this.setRedirectMessage(redirectMessage);
    if (redirectTo) this.setRedirectTo(redirectTo);
    if (settings) this.setSettings(settings);
  }

  public toSerializableObject(): SerializableObject {
    return {
      status: this.status,
      registrationData: this.settings,
      oauth2Token: {
        access_token: this.access_token,
        token_type: this.token_type,
        refresh_token: this.refresh_token,
        expires_in: this.expires_in,
        grant_type: this.grant_type,
        metadata: this.metadata,
      },
      redirect:
        this.redirectMessage || this.redirectTo
          ? {
              redirectMessage: this.redirectMessage,
              redirectTo: this.redirectTo,
            }
          : undefined,
    };
  }

  /**
   * Sets updated settings after the authentication flow is complete.
   *
   * If this is left undefined then the settings will not be updated.
   * @param settings the updated settings.
   */
  public setSettings(settings: SerializableObject) {
    this.settings = settings;
  }

  /**
   * Sets the oauth access token.
   * @param accessToken the oauth access token.
   */
  public setAccessToken(accessToken: string) {
    this.access_token = accessToken;
  }

  /**
   * Sets the oauth token type.
   * @param tokenType the oauth token type.
   */
  public setTokenType(tokenType: string) {
    this.token_type = tokenType;
  }

  /**
   * Sets the oauth refresh token.
   * @param refreshToken the oauth refresh token.
   */
  public setRefreshToken(refreshToken: string) {
    this.refresh_token = refreshToken;
  }

  /**
   * Sets the number of seconds until that authentication is valid for.
   * @param expiresIn the number of seconds until that authentication is valid for.
   */
  public setExpiresIn(expiresIn: number) {
    this.expires_in = expiresIn;
  }

  /**
   * Sets the auth grant type.
   * @param grantType the oauth grant type.
   */
  public setGrantType(grantType: string) {
    this.grant_type = grantType;
  }

  /**
   * Sets additional metadata to be stored against the oauth token.
   * @param metadata additional metadata to be stored against the oauth token.
   */
  public setMetadata(metadata: Record<string, string>) {
    this.metadata = metadata;
  }

  /**
   * Sets a URL that the user will be redirected to after they have completed the oauth flow.
   *
   * This will override ay value set for `redirectMessage`.
   * @param redirectTo a URL to redirect the user to.
   */
  public setRedirectTo(redirectTo: string) {
    this.redirectTo = redirectTo;
  }

  /**
   * Sets a message to be displayed to the user after the have completed the oauth flow.
   *
   * If `redirectTo` is set, this will be ignored.
   * @param redirectMessage the redirect message.
   */
  public setRedirectMessage(redirectMessage: string) {
    this.redirectMessage = redirectMessage;
  }
}
