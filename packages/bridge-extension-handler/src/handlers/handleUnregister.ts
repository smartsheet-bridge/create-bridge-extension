import { ExtensionFunction } from '@smartsheet-extensions/handler';

export interface UnregisterConfig {
  onUnregister?: ExtensionFunction;
}

export const PLUGIN_UNREGISTER = 'PLUGIN_UNREGISTER';

export interface UnregisterPayload {
  event: typeof PLUGIN_UNREGISTER;
  payload: {
    registrationData: object;
  };
}

const isUnregisterPayload = (payload: any): payload is UnregisterPayload =>
  payload.event === PLUGIN_UNREGISTER;

export const handleUnregister = (config: UnregisterConfig) => (body: any) => {
  if (isUnregisterPayload(body)) {
    const registrationData =
      (body.payload && body.payload.registrationData) || {};

    if (typeof config.onUnregister === 'function') {
      return config.onUnregister(registrationData, { registrationData });
    }
  }
};
