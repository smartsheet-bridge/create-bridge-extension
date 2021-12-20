import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { createHTTPClient } from './http/httpService';
import { parseAccountURL } from './http/utils';

export const createBridgeService = (host: string, auth: string) => {
  const debugRequest = Logger.debug('API Request');
  const debugResponse = Logger.debug('API Response');

  const { protocol, accountName, hostName } = parseAccountURL(host);
  const baseURL = `${protocol}://${accountName}.${hostName}/api/`;
  const http = createHTTPClient({
    baseURL,
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
