import {
  ExtensionHandlerCallback,
  ExtensionHandlerEnhancer,
  RequestPayload,
} from '../handler';

const PING = 'PING';

export type PingPayload = RequestPayload<typeof PING>;

const isPingPayload = (payload: PingPayload): payload is PingPayload =>
  payload.event === PING;

/**
 * This handler will immediately return if the payload includes a property
 * called `event` and it is equal to `PING`.
 *
 * **Note:** This is an internal health check device and should always be included.
 */
export const handlePing = (): ExtensionHandlerEnhancer => create => () => {
  const handler = create();

  return (payload: PingPayload, callback: ExtensionHandlerCallback) => {
    if (isPingPayload(payload)) {
      callback();
    } else {
      handler(payload, callback);
    }
  };
};
