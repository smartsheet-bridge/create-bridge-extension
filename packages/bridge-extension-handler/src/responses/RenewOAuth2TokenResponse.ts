import {
  ExtensionResponse,
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

export interface RenewOAuth2TokenResponse extends ExtensionResponse {
  access_token: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  grant_type?: string;
  metadata?: Record<string, string>;
}

export class RenewOAuth2TokenResponse
  extends AbstractResponse
  implements SerializableClass {
  access_token: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  grant_type?: string;
  metadata?: Record<string, string>;

  public static create(props: Partial<RenewOAuth2TokenResponse> = {}) {
    return new RenewOAuth2TokenResponse(props);
  }

  public constructor({
    status,
    access_token,
    token_type,
    refresh_token,
    expires_in,
    grant_type,
    metadata,
  }: Partial<RenewOAuth2TokenResponse> = {}) {
    super(status);
    if (access_token) this.setAccessToken(access_token);
    if (token_type) this.setTokenType(token_type);
    if (refresh_token) this.setRefreshToken(refresh_token);
    if (expires_in) this.setExpiresIn(expires_in);
    if (grant_type) this.setGrantType(grant_type);
    if (metadata) this.setMetadata(metadata);
  }

  public toSerializableObject(): SerializableObject {
    return {
      status: this.status,
      oauth2Token: {
        access_token: this.access_token,
        token_type: this.token_type,
        refresh_token: this.refresh_token,
        expires_in: this.expires_in,
        grant_type: this.grant_type,
        metadata: this.metadata,
      },
    };
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
}
