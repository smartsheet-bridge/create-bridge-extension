import {
  compose,
  createExtensionHandler,
  handleHasProperty,
  handlePing,
  handlePromises,
  handleThunks,
  lambdaTransport,
  toSerializableObject,
  xorHandler,
  handleBigPayLoad,
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
  HandleOAuth2CodeConfig,
  handleOAuth2HandleCode,
  OAUTH2_HANDLE_CODE,
} from './handlers/handleOAuth2HandleCode';
import {
  handleOAuth2RenewToken,
  OAuth2RenewTokenConfig,
  OAUTH2_RENEW_TOKEN,
} from './handlers/handleOAuth2RenewToken';
import {
  handleOAuth2Start,
  OAuth2StartConfig,
  OAUTH2_START,
} from './handlers/handleOAuthStart';
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
  serialize,
} from '@smartsheet-extensions/handler';
export {
  ExternalFunction,
  ExternalsConfig,
  handleExternals,
} from './handlers/handleExternals';
export {
  handleModules,
  ModuleFunction,
  ModulesConfig,
} from './handlers/handleModules';
export {
  HandleOAuth2CodeConfig,
  HandleOAuth2CodeFunction,
  handleOAuth2HandleCode,
} from './handlers/handleOAuth2HandleCode';
export {
  handleOAuth2RenewToken,
  OAuth2RenewTokenConfig,
  RenewOAuth2TokenFunction,
} from './handlers/handleOAuth2RenewToken';
export {
  handleOAuth2Start,
  OAuth2StartConfig,
  StartOAuth2Function,
} from './handlers/handleOAuthStart';
export {
  handleRegister,
  RegisterConfig,
  RegisterFunction,
} from './handlers/handleRegister';
export {
  handleUnregister,
  UnregisterConfig,
  UnregisterFunction,
} from './handlers/handleUnregister';
export * from './responses';

export type BridgeConfiguration = RegisterConfig &
  UnregisterConfig &
  ModulesConfig &
  ExternalsConfig &
  OAuth2StartConfig &
  HandleOAuth2CodeConfig &
  OAuth2RenewTokenConfig;

export const createBridgeHandler = (config: BridgeConfiguration) => {
  const payloadHandler = xorHandler({
    PING: handlePing(),
    [OAUTH2_START]: handleOAuth2Start(config),
    [OAUTH2_HANDLE_CODE]: handleOAuth2HandleCode(config),
    [OAUTH2_RENEW_TOKEN]: handleOAuth2RenewToken(config),
    [PLUGIN_REGISTER]: handleRegister(config),
    [PLUGIN_UNREGISTER]: handleUnregister(config),
    [MODULE_EXEC]: handleModules(config),
    [EXTERNAL_CALL]: handleExternals(config),
  });

  const enhancer = compose(
    lambdaTransport,
    handleBigPayLoad,
    toSerializableObject,
    handleHasProperty('event'),
    payloadHandler,
    handlePromises,
    handleThunks
  );

  return createExtensionHandler(enhancer);
};
