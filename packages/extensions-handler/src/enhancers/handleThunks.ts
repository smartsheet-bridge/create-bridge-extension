import { ExtensionHandlerEnhancer } from '../handler';

export type ThunkFunction<R = any> = (resolve: (result: R) => void) => void;

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
    handler(body, (err, resultOrThunk: ThunkFunction | unknown) => {
      if (typeof resultOrThunk === 'function') {
        resultOrThunk((result: unknown) => callback(err, result));
      } else {
        callback(err, resultOrThunk);
      }
    });
  };
};
