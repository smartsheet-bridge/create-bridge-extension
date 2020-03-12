import { bridgeSDK } from '@smartsheet-bridge/bridge-sdk';
import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';

export const createBridgeService = (host: string, auth: string) => {
  const debugRequest = Logger.debug('API Request');
  const debugRespone = Logger.debug('API Response');
  const sdk = bridgeSDK({
    accountURL: host,
    APIKey: auth,
  });
  sdk.API.interceptors.request.use(request => {
    Logger.verbose(
      'API Request',
      Chalk.cyan(`${request.baseURL}${request.url}`)
    );
    debugRequest('Headers', request.headers);
    debugRequest('Params', request.params);
    debugRequest('Data', request.data);
    return request;
  });
  sdk.API.interceptors.response.use(response => {
    Logger.verbose(
      'API Response',
      Chalk.cyan(`${response.status} ${response.statusText}`)
    );
    debugRespone('Status', response.status);
    debugRespone('Headers', response.headers);
    debugRespone('Data', response.data);
    return response;
  });

  const platform = () =>
    sdk
      .platform()
      .then(
        ({
          data: { pluginDataService },
        }: {
          data: { pluginDataService: { domain: string; port: string } };
        }) => pluginDataService
      );

  return { ...sdk, platform };
};
