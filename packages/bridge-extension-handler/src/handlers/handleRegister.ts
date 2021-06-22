import {
  ExtensionHandlerEnhancer,
  isSerializableObject,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { BadRegisterResponseError } from '../errors/BadRegisterResponseError';
import { Caller } from '../models/Caller';
import { RegisterResponse } from '../responses/RegisterResponse';
import { BridgeContext, BridgeFunction } from '../types';

export interface RegisterContext<
  Settings extends SerializableObject = SerializableObject
> extends BridgeContext<Settings> {
  externalURI?: Record<string, string>;
  inboundURI?: string;
  webhookURI?: Record<string, string>;
}

export type RegisterFunction<
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<
  RegisterResponse<Settings>,
  Settings,
  RegisterContext<Settings>
>;

export interface RegisterConfig {
  onRegister?: RegisterFunction;
}

export const PLUGIN_REGISTER = 'PLUGIN_REGISTER';

export interface RegisterPayload {
  event: typeof PLUGIN_REGISTER;
  caller: Caller;
  payload: {
    externalURI?: Record<string, string>;
    inboundURI?: string;
    registrationData: SerializableObject;
    webhookURI?: Record<string, string>;
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
      const settings = (body.payload && body.payload.registrationData) || {};
      const { caller } = body;
      const { externalURI, inboundURI, webhookURI } = body.payload || {};

      next(
        config.onRegister(settings, {
          caller,
          settings,
          externalURI,
          inboundURI,
          webhookURI,
        }),
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
