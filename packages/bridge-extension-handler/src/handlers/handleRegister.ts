import {
  ExtensionHandlerEnhancer,
  isSerializableObject,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { BadRegisterResponseError } from '../errors/BadRegisterResponseError';
import { RegisterResponse } from '../responses/RegisterResponse';
import { BridgeFunction } from '../types';

// TODO: Change AbstractResponse to RegisterResponse once built.
export type RegisterFunction<
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<RegisterResponse<Settings>, Settings, Settings>;
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
        (err?: Error, result?: unknown) => {
          if (err) {
            callback(err);
          } else if (result instanceof RegisterResponse) {
            callback(err, result);
          } else if (isSerializableObject(result)) {
            callback(err, RegisterResponse.create(result));
          } else if (result === null) {
            throw new BadRegisterResponseError('null');
          } else {
            throw new BadRegisterResponseError(typeof result);
          }
        }
      );
    } else {
      next(body, callback);
    }
  };
};
