import {
  ExtensionHandlerEnhancer,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from '../responses/AbstractResponse';
import { BridgeFunction } from '../types';

// TODO: Change AbstractResponse to RegisterResponse once built.
export type RegisterFunction<
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<AbstractResponse, Params, Settings>;
export interface RegisterConfig {
  onRegister?: RegisterFunction;
}

export const PLUGIN_REGISTER = 'PLUGIN_REGISTER';

export interface RegisterPayload {
  event: typeof PLUGIN_REGISTER;
  payload: {
    registrationData: SerializableObject;
  };
}

const isRegisterPayload = (payload: any): payload is RegisterPayload =>
  payload.event === PLUGIN_REGISTER;

export const handleRegister = (
  config: RegisterConfig
): ExtensionHandlerEnhancer => create => () => {
  const next = create();
  return (body, callback) => {
    if (isRegisterPayload(body) && typeof config.onRegister === 'function') {
      const registrationData =
        (body.payload && body.payload.registrationData) || {};

      next(
        config.onRegister(registrationData, { settings: registrationData }),
        callback
      );
    } else {
      next(body, callback);
    }
  };
};
