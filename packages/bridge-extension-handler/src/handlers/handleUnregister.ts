import {
  ExtensionHandlerEnhancer,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from '../responses/AbstractResponse';
import { BridgeFunction } from '../types';

// TODO: Change AbstractResponse to UnregisterResponse once built.
export type UnregisterFunction<
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<AbstractResponse, Params, Settings>;
export interface UnregisterConfig {
  onUnregister?: UnregisterFunction;
}

export const PLUGIN_UNREGISTER = 'PLUGIN_UNREGISTER';

export interface UnregisterPayload {
  event: typeof PLUGIN_UNREGISTER;
  payload: {
    registrationData: SerializableObject;
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
      const registrationData =
        (body.payload && body.payload.registrationData) || {};

      next(
        config.onUnregister(registrationData, { settings: registrationData }),
        callback
      );
    } else {
      next(body, callback);
    }
  };
};
