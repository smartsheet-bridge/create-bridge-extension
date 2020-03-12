import Axios from 'axios';
import grpc from './transports/grpc';
import { parseAccountURL } from './utils';

export interface BridgeSDKConfig {
  accountURL: string;
  APIKey: string;
}

export interface Caller {
  revision: string;
  pluginUUID: string;
  installUUID: string;
}

export const bridgeSDK = ({ accountURL, APIKey }: BridgeSDKConfig) => {
  const { accountName, hostName, protocol } = parseAccountURL(accountURL);

  const API = Axios.create({
    baseURL: `${protocol}://${accountName}.${hostName}/api/`,
    headers: {
      'X-CONVERSE-TOKEN': APIKey,
    },
  });

  const platform = () => API.get('platform');

  const extensionCaller = (extensionID: string) =>
    API.post<{ caller?: Caller }>(`plugins/remote/${extensionID}/token`);

  const extensionRevoke = (extensionID: string, force: boolean = false) =>
    API.delete(`plugins/remote/${extensionID}`, {
      params: {
        force,
      },
    });

  const extensionUploadSpec = (data: any) =>
    API.post<{ uploadRef?: Caller }>(`plugins/remote`, data);

  const extensionActivateRevision = (extensionUUID: string, revision: string) =>
    API.put<{ uploadRef?: Caller }>(
      `plugins/remote/${extensionUUID}?activate=${revision}`,
      {},
      {
        params: {
          activate: revision,
        },
      }
    );

  const extensions = {
    revoke: extensionRevoke,
    uploadSpec: extensionUploadSpec,
    activateRevision: extensionActivateRevision,
    caller: extensionCaller,
  };

  return {
    platform,
    extensions,
    API,
    RPC: grpc,
  };
};
