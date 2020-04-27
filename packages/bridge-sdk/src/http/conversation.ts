import { createAPICall, createAPIModule } from '../utils';
import createQuery, { BridgeHTTPQuery } from './createQuery';
import { BridgeHTTPInstance, BridgeHTTPRequestConfig } from './types';

const queryConversation = createQuery('conversation');

export const query = createAPICall(
  (instance: BridgeHTTPInstance) => (
    q: BridgeHTTPQuery,
    config?: BridgeHTTPRequestConfig
  ) => queryConversation(instance)(q, config)
);

export interface Fetch {
  uuid: string;
}

export const fetch = createAPICall(
  (instance: BridgeHTTPInstance) => (
    { uuid }: Fetch,
    config?: BridgeHTTPRequestConfig
  ) => instance.get(`conversation/${uuid}`, config)
);

export default createAPIModule({
  query,
  fetch,
});
