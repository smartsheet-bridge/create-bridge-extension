import {
  BadRequestError,
  ExtensionHandlerEnhancer,
  isSerializableObject,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { BadStartOAuth2ResponseError } from '../errors/BadStartOAuth2ResponseError';
import { Caller } from '../models/Caller';
import { OAuth2SetupData } from '../models/OAuth2SetupData';
import { OAuthType } from '../models/OAuthType';
import { StartOAuth2Response } from '../responses/StartOAuth2Response';
import { BridgeFunction } from '../types';

export type StartOAuth2Function<
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<StartOAuth2Response, Params, Settings>;

export interface OAuth2StartConfig {
  onOAuthStart?: StartOAuth2Function;
}

export const OAUTH2_START = 'OAUTH2_START';

export interface StartOAuth2Payload {
  event: typeof OAUTH2_START;
  caller: Caller;
  payload: {
    oauthType: OAuthType;
    redirectURI: string;
    registrationData: SerializableObject;
  };
}

const isStartOAuth2Payload = (payload: any): payload is StartOAuth2Payload =>
  payload.event === OAUTH2_START;

const isOAuth2SetupData = (o: unknown) => {
  return (
    isSerializableObject(o) &&
    o.oauth2URI !== undefined &&
    o.clientId !== undefined
  );
};

export const handleOAuth2Start = (
  config: OAuth2StartConfig
): ExtensionHandlerEnhancer => create => () => {
  const next = create();
  return (body, callback) => {
    if (typeof config.onOAuthStart !== 'function') {
      throw new BadRequestError('onOAuthStart function has not been defined');
    }

    if (!isStartOAuth2Payload(body)) {
      throw new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      );
    }
    const settings = (body.payload && body.payload.registrationData) || {};
    const { caller } = body;

    next(
      config.onOAuthStart(
        {
          oauthType: body.payload.oauthType,
          redirectURI: body.payload.redirectURI,
        },
        { caller, settings }
      ),
      (err?: Error, result?: unknown) => {
        if (err) {
          callback(err);
        } else if (result instanceof StartOAuth2Response) {
          callback(err, result);
        } else if (result instanceof OAuth2SetupData) {
          callback(err, StartOAuth2Response.create(result));
        } else if (isOAuth2SetupData(result)) {
          callback(
            err,
            StartOAuth2Response.create(OAuth2SetupData.create(result))
          );
        } else if (result === null) {
          throw new BadStartOAuth2ResponseError('null');
        } else {
          throw new BadStartOAuth2ResponseError(typeof result);
        }
      }
    );
  };
};
