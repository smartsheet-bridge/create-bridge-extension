import { BridgeHTTPInstance, BridgeHTTPRequestConfig } from './types';
import { createAPICall, createAPIModule } from './utils';

export interface Caller {
  Data: {
    accountID: string;
    createdAt: string | number;
    id: string;
    modifiedAt: string | number;
    revisionID: string;
    uploadTo: {
      uri: string;
      expiresAt: string | number;
      method: string;
    };
  };
  Links: any;
  Meta: {
    requestID: string;
    version: string;
  };
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
  numericDates?: boolean;
  force?: boolean;
}

export const uploadSpec = createAPICall(
  (instance: BridgeHTTPInstance) => (
    { data, numericDates = false, force = false }: UploadSpecOptions,
    config?: BridgeHTTPRequestConfig
  ) =>
    instance.post<Caller>(
      `v2/extensions?numericDates=${numericDates}&force=${force}`,
      data,
      config
    )
);

export interface ActivateRevisionOptions extends ExtensionUUIDOptions {
  revision: string;
}

export const activateRevision = createAPICall(
  (instance: BridgeHTTPInstance) => (
    { extensionUUID, revision }: ActivateRevisionOptions,
    config: BridgeHTTPRequestConfig = {}
  ) =>
    instance.post<Caller>(
      `v2/extensions/${extensionUUID}/revision/${revision}`,
      {},
      config
    )
);

export default createAPIModule({
  caller,
  revoke,
  uploadSpec,
  activateRevision,
});
