import {
  ExtensionHandlerEnhancer,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { Caller } from '../models/Caller';
import { OAuth2Data } from '../models/OAuth2Data';
import { AbstractResponse } from '../responses/AbstractResponse';
import { BridgeContext, BridgeFunction } from '../types';

// TODO: Change AbstractResponse to UnregisterResponse once built.
export type UnregisterFunction<
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<AbstractResponse, Settings, UnregisterContext<Settings>>;

export interface UnregisterConfig {
  onUnregister?: UnregisterFunction;
}

export interface UnregisterContext<
  Settings extends SerializableObject = SerializableObject
> extends BridgeContext<Settings> {
  externalURI?: Record<string, string>;
  inboundURI?: string;
  webhookURI?: Record<string, string>;
}

export const PLUGIN_UNREGISTER = 'PLUGIN_UNREGISTER';

export interface UnregisterPayload {
  event: typeof PLUGIN_UNREGISTER;
  caller: Caller;
  payload: {
    providerOAuth?: OAuth2Data;
    externalURI?: Record<string, string>;
    inboundURI?: string;
    registrationData: SerializableObject;
    webhookURI?: Record<string, string>;
  };
}

const isUnregisterPayload = (payload: any): payload is UnregisterPayload =>
  payload.event === PLUGIN_UNREGISTER;

export const handleUnregister = (
  config: UnregisterConfig
): ExtensionHandlerEnhancer => create => () => {
  const next = create();
  return (body, callback) => {
    if (
      isUnregisterPayload(body) &&
      typeof config.onUnregister === 'function'
    ) {
      const settings = (body.payload && body.payload.registrationData) || {};
      const { caller } = body;
      const { externalURI, inboundURI, webhookURI, providerOAuth } =
        body.payload || {};

      next(
        config.onUnregister(settings, {
          caller,
          externalURI,
          inboundURI,
          webhookURI,
          settings,
          oAuthData: providerOAuth,
        }),
        callback
      );
    } else {
      next(body, callback);
    }
  };
};
