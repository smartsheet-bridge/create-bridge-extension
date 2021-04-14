import { ExtensionHandlerEnhancer } from '../handler';

/**
 * This handler will call a returned function with the callback as a
 * parameter allowing handlers greater control of when to respond to the
 * caller.
 *
 * @example
 * ```
 * // index.js
 * return createExtensibleHandler(handleThunks)
 *
 * // handler.js
 * return () => respond => {
 *   // execute before handler responds
 *   respond();
 *   // execute after handler responds
 * }
 * ```
 */
export const handleThunks: ExtensionHandlerEnhancer = create => () => {
  const handler = create();
  return (body, callback) => {
    handler(body, (resultOrThunk: unknown) => {
      if (typeof resultOrThunk === 'function') {
        resultOrThunk(callback);
      } else {
        callback(resultOrThunk);
      }
    });
  };
};
