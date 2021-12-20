import createInstance from './createBridgeHttpInstance';
import extension from './extension';
import platform from './platform';
import { BridgeHTTPInstance, BridgeHTTPRequestConfig } from './types';

const buildHTTPClient = (instance: BridgeHTTPInstance) => {
  return {
    instance,
    extension: extension(instance),
    platform: platform(instance),
  };
};

export function createHTTPClient(
  config: BridgeHTTPRequestConfig
): BridgeHTTPClient {
  const instance = createInstance(config);
  return buildHTTPClient(instance);
}

export type BridgeHTTPClient = ReturnType<typeof buildHTTPClient>;
