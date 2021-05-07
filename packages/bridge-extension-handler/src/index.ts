import {
  compose,
  createExtensionHandler,
  handleHasProperty,
  handlePayloadFunctions,
  handlePing,
  handlePromises,
  handleThunks,
  httpTransport,
} from '@smartsheet-extensions/handler';
import {
  ExternalsConfig,
  EXTERNAL_CALL,
  handleExternals,
} from './handlers/handleExternals';
import {
  handleModules,
  ModulesConfig,
  MODULE_EXEC,
} from './handlers/handleModules';
import {
  handleRegister,
  PLUGIN_REGISTER,
  RegisterConfig,
} from './handlers/handleRegister';
import {
  handleUnregister,
  PLUGIN_UNREGISTER,
  UnregisterConfig,
} from './handlers/handleUnregister';

export type BridgeConfiguration = RegisterConfig &
  UnregisterConfig &
  ModulesConfig &
  ExternalsConfig;

export const createBridgeHandler = (config: BridgeConfiguration) => {
  const payloadHandler = handlePayloadFunctions({
    [PLUGIN_REGISTER]: handleRegister(config),
    [PLUGIN_UNREGISTER]: handleUnregister(config),
    [MODULE_EXEC]: handleModules(config),
    [EXTERNAL_CALL]: handleExternals(config),
  });

  const enhancer = compose(
    httpTransport,
    handleHasProperty('event'),
    handlePing(),
    payloadHandler,
    handleThunks,
    handlePromises
  );

  return createExtensionHandler(enhancer);
};
