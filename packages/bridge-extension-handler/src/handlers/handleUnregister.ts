import {
  ExtensionFunction,
  ExtensionHandlerEnhancer,
} from '@smartsheet-extensions/handler';

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
        config.onUnregister(registrationData, { registrationData }),
        callback
      );
    } else {
      next(body, callback);
    }
  };
};
