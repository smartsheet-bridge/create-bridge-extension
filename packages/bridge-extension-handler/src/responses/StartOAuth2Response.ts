import {
  ExtensionResponse,
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

export interface StartOAuth2Response
  extends ExtensionResponse,
    SerializableClass {
  oauth2URI: string;
  clientId: string;
  scope?: string;
  state?: string;
  comment?: string;
  extraParams?: Record<string, string>;
}

export class StartOAuth2Response
  extends AbstractResponse
  implements SerializableClass {
  oauth2URI: string;
  clientId: string;
  scope?: string;
  state?: string;
  comment?: string;
  extraParams?: Record<string, string>;

  public static create(props: Partial<StartOAuth2Response> = {}) {
    return new StartOAuth2Response(props);
  }

  public constructor({
    status,
    oauth2URI,
    clientId,
    scope,
    state,
    comment,
    extraParams,
  }: Partial<StartOAuth2Response> = {}) {
    super(status);
    if (oauth2URI) this.setOAuth2URI(oauth2URI);
    if (clientId) this.setClientId(clientId);
    if (scope) this.setScope(scope);
    if (state) this.setState(state);
    if (comment) this.setComment(comment);
    if (extraParams) this.setExtraParams(extraParams);
  }

  public toSerializableObject(): SerializableObject {
    return {
      status: this.status,
      oauth2Setup: {
        oauth2URI: this.oauth2URI,
        clientId: this.clientId,
        scope: this.scope,
        state: this.state,
        comment: this.comment,
        extraParams: this.extraParams,
      },
    };
  }

  /**
   * Sets the OAuth2 URI.
   * @param oauth2URI the OAuth2 URI.
   */
  public setOAuth2URI(oauth2URI: string) {
    this.oauth2URI = oauth2URI;
  }

  /**
   * Sets the OAuth app client Id.he OAuth app client Id
   * @param clientId the OAuth app client Id.
   */
  public setClientId(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Sets the OAuth scope.
   * @param scope the OAuth scope.
   */
  public setScope(scope: string) {
    this.scope = scope;
  }

  /**
   * Sets the OAuth state.
   * @param state the OAuth state.
   */
  public setState(state: string) {
    this.state = state;
  }

  /**
   * Sets a comment to display with the generated link.
   * @param comment an optional comment to display with link.
   */
  public setComment(comment: string) {
    this.comment = comment;
  }

  /**
   * Sets additional parameters to be included in the OAuth2 request.
   * @param extraParams additional parameters to be included in the OAuth2 request.
   */
  public setExtraParams(extraParams: Record<string, string>) {
    this.extraParams = extraParams;
  }
}
