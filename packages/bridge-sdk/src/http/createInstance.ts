import Axios from 'axios';
import { BridgeHTTPInstance, BridgeHTTPRequestConfig } from './types';

export const isBridgeHTTPInstance = (
  maybe: BridgeHTTPInstance | any
): maybe is BridgeHTTPInstance =>
  typeof maybe === 'function' &&
  maybe.defaults !== undefined &&
  maybe.interceptors !== undefined &&
  maybe.getUri !== undefined &&
  maybe.request !== undefined &&
  maybe.get !== undefined &&
  maybe.delete !== undefined &&
  maybe.head !== undefined &&
  maybe.options !== undefined &&
  maybe.post !== undefined &&
  maybe.put !== undefined &&
  maybe.patch !== undefined;

export default (
  configOrInstance: BridgeHTTPRequestConfig | BridgeHTTPInstance = {}
): BridgeHTTPInstance => {
  const instance = isBridgeHTTPInstance(configOrInstance)
    ? configOrInstance
    : (Axios.create(configOrInstance) as BridgeHTTPInstance);

  instance.interceptors.request.use((config: BridgeHTTPRequestConfig) => {
    config.headers = config.headers || [];
    config.headers['X-CONVERSE-TOKEN'] =
      instance.defaults.token || config.token;
    config.headers['X-CONVERSE-SPACE'] =
      instance.defaults.workspace || config.workspace;
    console.log(config);
    return config;
  });

  return instance;
};
