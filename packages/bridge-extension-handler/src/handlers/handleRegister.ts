import {
  ExtensionFunction,
  ExtensionHandlerEnhancer,
} from '@smartsheet-extensions/handler';

export interface RegisterConfig {
  onRegister?: ExtensionFunction;
}

export const PLUGIN_REGISTER = 'PLUGIN_REGISTER';

export interface RegisterPayload {
  event: typeof PLUGIN_REGISTER;
  payload: {
    registrationData: object;
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

      next(config.onRegister(registrationData, { registrationData }), callback);
    } else {
      next(body, callback);
    }
  };
};
