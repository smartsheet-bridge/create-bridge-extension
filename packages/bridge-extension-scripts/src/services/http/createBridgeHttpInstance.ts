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

export default (config: BridgeHTTPRequestConfig = {}): BridgeHTTPInstance => {
  const instance = Axios.create(config) as BridgeHTTPInstance;

  instance.interceptors.request.use((reqConfig: BridgeHTTPRequestConfig) => {
    const newConfig = reqConfig;
    if (reqConfig.token) {
      newConfig.headers['X-CONVERSE-TOKEN'] = reqConfig.token;
    }
    return newConfig;
  });

  return instance;
};
