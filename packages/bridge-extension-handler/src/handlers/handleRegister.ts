import { ExtensionFunction } from '@smartsheet-extensions/handler';

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

export const handleRegister = (config: RegisterConfig) => (
  body: RegisterPayload
) => {
  if (isRegisterPayload(body)) {
    const registrationData =
      (body.payload && body.payload.registrationData) || {};

    if (typeof config.onRegister === 'function') {
      return config.onRegister(registrationData, { registrationData });
    }
  }
};
