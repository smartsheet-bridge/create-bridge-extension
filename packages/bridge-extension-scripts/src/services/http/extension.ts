import { BridgeHTTPInstance, BridgeHTTPRequestConfig } from './types';
import { createAPICall, createAPIModule } from './utils';

export interface Caller {
  revision: string;
  pluginUUID: string;
  installUUID: string;
}

export interface ExtensionUUIDOptions {
  extensionUUID: string;
}

export type CallerOptions = ExtensionUUIDOptions;

export const caller = createAPICall(
  (instance: BridgeHTTPInstance) => (
    { extensionUUID }: CallerOptions,
    config?: BridgeHTTPRequestConfig
  ) =>
    instance.post<{ caller?: Caller }>(
      `plugins/remote/${extensionUUID}/token`,
      undefined,
      config
    )
);

export interface RevokeOptions extends ExtensionUUIDOptions {
  force?: boolean;
}

export const revoke = createAPICall(
  (instance: BridgeHTTPInstance) => (
    { extensionUUID, force = false }: RevokeOptions,
    config: BridgeHTTPRequestConfig = {}
  ) =>
    instance.delete(`plugins/remote/${extensionUUID}`, {
      ...config,
      params: {
        ...config.params,
        force,
      },
    })
);

export interface UploadSpecOptions {
  data: any;
}

export const uploadSpec = createAPICall(
  (instance: BridgeHTTPInstance) => (
    { data }: UploadSpecOptions,
    config?: BridgeHTTPRequestConfig
  ) => instance.post<{ uploadRef?: Caller }>(`plugins/remote`, data, config)
);

export interface ActivateRevisionOptions extends ExtensionUUIDOptions {
  revision: string;
}

export const activateRevision = createAPICall(
  (instance: BridgeHTTPInstance) => (
    { extensionUUID, revision }: ActivateRevisionOptions,
    config: BridgeHTTPRequestConfig = {}
  ) =>
    instance.put<{ uploadRef?: Caller }>(
      `plugins/remote/${extensionUUID}?activate=${revision}`,
      {},
      {
        ...config,
        params: {
          ...config.params,
          activate: revision,
        },
      }
    )
);

export default createAPIModule({
  caller,
  revoke,
  uploadSpec,
  activateRevision,
});
