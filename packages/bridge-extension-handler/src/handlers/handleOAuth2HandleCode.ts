import {
  BadRequestError,
  ExtensionHandlerEnhancer,
  isSerializableObject,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { BadHandleOAuth2CodeResponseError } from '../errors/BadHandleOAuth2CodeResponseError';
import { OAuth2Data } from '../models/OAuth2Data';
import { OAuthType } from '../models/OAuthType';
import { HandleOAuth2CodeResponse } from '../responses/HandleOAuth2CodeResponse';
import { BridgeFunction } from '../types';

export type HandleOAuth2CodeFunction<
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<HandleOAuth2CodeResponse, Params, Settings>;

export interface HandleOAuth2CodeConfig {
  onOAuthHandleCode?: HandleOAuth2CodeFunction;
}

export const OAUTH2_HANDLE_CODE = 'OAUTH2_HANDLE_CODE';

export interface HandleOAuth2CodePayload {
  event: typeof OAUTH2_HANDLE_CODE;
  payload: {
    scope?: string;
    state?: string;
    code: string;
    oauthType: OAuthType;
    redirectURI: string;
    registrationData: SerializableObject;
  };
}

const isHandleOAuth2CodePayload = (
  payload: any
): payload is HandleOAuth2CodePayload => payload.event === OAUTH2_HANDLE_CODE;

const isOAuth2Data = (o: unknown) => {
  return isSerializableObject(o) && o.access_token !== undefined;
};

export const handleOAuth2HandleCode = (
  config: HandleOAuth2CodeConfig
): ExtensionHandlerEnhancer => create => () => {
  const next = create();
  return (body, callback) => {
    if (typeof config.onOAuthHandleCode !== 'function') {
      throw new BadRequestError(
        'onOAuthHandleCode function has not been defined'
      );
    }

    if (!isHandleOAuth2CodePayload(body)) {
      throw new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      );
    }
    const settings = (body.payload && body.payload.registrationData) || {};

    next(
      config.onOAuthHandleCode(
        {
          code: body.payload.code,
          state: body.payload.state,
          scope: body.payload.scope,
          oauthType: body.payload.oauthType,
          redirectURI: body.payload.redirectURI,
        },
        { settings }
      ),
      (err?: Error, result?: unknown) => {
        if (err) {
          callback(err);
        } else if (result instanceof HandleOAuth2CodeResponse) {
          callback(err, result);
        } else if (result instanceof OAuth2Data) {
          callback(err, HandleOAuth2CodeResponse.create(result));
        } else if (isOAuth2Data(result)) {
          callback(
            err,
            HandleOAuth2CodeResponse.create(OAuth2Data.create(result))
          );
        } else if (result === null) {
          throw new BadHandleOAuth2CodeResponseError('null');
        } else {
          throw new BadHandleOAuth2CodeResponseError(typeof result);
        }
      }
    );
  };
};
