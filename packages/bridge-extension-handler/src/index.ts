import {
  compose,
  createExtensionHandler,
  handleHasProperty,
  handlePing,
  handlePromises,
  handleThunks,
  httpTransport,
  toSerializableObject,
  xorHandler,
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

export {
  ErrorResponse,
  ExtensionResponse,
  ExtensionStatus,
  SerializableArray,
  SerializableObject,
  SerializablePrimitive,
  SerializableValue,
} from '@smartsheet-extensions/handler';
export {
  // TODO: Export once built
  // ExternalFunction,
  ExternalsConfig,
  handleExternals,
} from './handlers/handleExternals';
export {
  handleModules,
  ModuleFunction,
  ModulesConfig,
} from './handlers/handleModules';
export {
  handleRegister,
  RegisterConfig,
  RegisterFunction,
} from './handlers/handleRegister';
export {
  handleUnregister,
  // TODO: Export once built
  // UnregisterFunction
  UnregisterConfig,
} from './handlers/handleUnregister';
export { ModuleResponse } from './responses/ModuleResponse';

export type BridgeConfiguration = RegisterConfig &
  UnregisterConfig &
  ModulesConfig &
  ExternalsConfig;

export const createBridgeHandler = (config: BridgeConfiguration) => {
  const payloadHandler = xorHandler({
    PING: handlePing(),
    [PLUGIN_REGISTER]: handleRegister(config),
    [PLUGIN_UNREGISTER]: handleUnregister(config),
    [MODULE_EXEC]: handleModules(config),
    [EXTERNAL_CALL]: handleExternals(config),
  });

  const enhancer = compose(
    httpTransport,
    toSerializableObject,
    handleHasProperty('event'),
    payloadHandler,
    handlePromises,
    handleThunks
  );

  return createExtensionHandler(enhancer);
};
