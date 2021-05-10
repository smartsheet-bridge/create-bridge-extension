import {
  createHTTPClient,
  parseAccountURL,
} from '@smartsheet-bridge/bridge-sdk';
import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';

export const createBridgeService = (host: string, auth: string) => {
  const debugRequest = Logger.debug('API Request');
  const debugResponse = Logger.debug('API Response');
  const { accountName, hostName, protocol } = parseAccountURL(host);
  const http = createHTTPClient({
    baseURL: `${protocol}://${accountName}.${hostName}/api/`,
    token: auth,
  });
  http.instance.interceptors.request.use(request => {
    Logger.verbose(
      'API Request',
      Chalk.cyan(`${request.baseURL}${request.url}`)
    );
    debugRequest('Headers', request.headers);
    debugRequest('Params', request.params);
    debugRequest('Data', request.data);
    return request;
  });
  http.instance.interceptors.response.use(response => {
    Logger.verbose(
      'API Response',
      Chalk.cyan(`${response.status} ${response.statusText}`)
    );
    debugResponse('Status', response.status);
    debugResponse('Headers', response.headers);
    debugResponse('Data', response.data);
    return response;
  });

  return http;
};
