import conversation from './conversation';
import createInstance from './createInstance';
import extension from './extension';
import platform from './platform';
import { BridgeHTTPInstance, BridgeHTTPRequestConfig } from './types';

export * from './types';

export type BridgeHTTPClient = ReturnType<typeof buildHTTPClient>;

const buildHTTPClient = (instance: BridgeHTTPInstance) => {
  return {
    instance,
    extension: extension(instance),
    platform: platform(instance),
    conversation: conversation(instance),
  };
};

export function createHTTPClient(
  configOrInstance: BridgeHTTPRequestConfig | BridgeHTTPInstance
): BridgeHTTPClient {
  const instance = createInstance(configOrInstance);
  return buildHTTPClient(instance);
}
