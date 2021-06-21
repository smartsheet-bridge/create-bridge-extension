import {
  BadRequestError,
  ExtensionHandlerEnhancer,
  isSerializableObject,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { BadRenewOAuth2TokenResponseError } from '../errors/BadRenewOAuth2TokenResponseError';
import { Caller } from '../models/Caller';
import { OAuth2Data } from '../models/OAuth2Data';
import { OAuthType } from '../models/OAuthType';
import { HandleOAuth2CodeResponse } from '../responses/HandleOAuth2CodeResponse';
import { RenewOAuth2TokenResponse } from '../responses/RenewOAuth2TokenResponse';
import { BridgeFunction } from '../types';

export type RenewOAuth2TokenFunction<
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<RenewOAuth2TokenResponse, RenewOAuth2TokenParams, Settings>;

export interface OAuth2RenewTokenConfig {
  onOAuthRenewToken?: RenewOAuth2TokenFunction;
}

export interface RenewOAuth2TokenParams extends SerializableObject {
  renewToken: string;
  oauthType: OAuthType;
  redirectURI: string;
}

export const OAUTH2_RENEW_TOKEN = 'OAUTH2_RENEW_TOKEN';

export interface RenewOAuth2TokenPayload {
  event: typeof OAUTH2_RENEW_TOKEN;
  caller: Caller;
  payload: {
    renewToken: string;
    oauthType: OAuthType;
    redirectURI: string;
    registrationData: SerializableObject;
  };
}

const isRenewOAuth2TokenPayload = (
  payload: any
): payload is RenewOAuth2TokenPayload => payload.event === OAUTH2_RENEW_TOKEN;

const isOAuth2Data = (o: unknown) => {
  return isSerializableObject(o) && o.access_token !== undefined;
};

export const handleOAuth2RenewToken = (
  config: OAuth2RenewTokenConfig
): ExtensionHandlerEnhancer => create => () => {
  const next = create();

  return (body, callback) => {
    if (typeof config.onOAuthRenewToken !== 'function') {
      throw new BadRequestError(
        'onOAuthRenewToken function has not been defined'
      );
    }

    if (!isRenewOAuth2TokenPayload(body)) {
      throw new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      );
    }

    const settings = (body.payload && body.payload.registrationData) || {};
    const { caller } = body;

    next(
      config.onOAuthRenewToken(
        {
          renewToken: body.payload.renewToken,
          oauthType: body.payload.oauthType,
          redirectURI: body.payload.redirectURI,
        },
        { settings, caller }
      ),
      (err?: Error, result?: unknown) => {
        if (err) {
          callback(err);
        } else if (result instanceof RenewOAuth2TokenResponse) {
          callback(err, result);
        } else if (result instanceof OAuth2Data) {
          callback(err, RenewOAuth2TokenResponse.create(result));
        } else if (isOAuth2Data(result)) {
          callback(
            err,
            HandleOAuth2CodeResponse.create(OAuth2Data.create(result))
          );
        } else if (result === null) {
          throw new BadRenewOAuth2TokenResponseError('null');
        } else {
          throw new BadRenewOAuth2TokenResponseError(typeof result);
        }
      }
    );
  };
};
