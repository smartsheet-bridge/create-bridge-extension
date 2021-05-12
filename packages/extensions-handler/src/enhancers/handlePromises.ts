import { ExtensionHandlerEnhancer } from '../handler';

/**
 * This handler will take a returned Promise and wait for it
 * to resolve before returning the resolved data.
 *
 * @example
 * ```
 * // index.js
 * return createExtensibleHandler(handlePromises)
 *
 * // handler.js
 * return () => new Promise(resolve => {
 *   setTimeout(() => {
 *     resolve('Hello,World!')
 *   }, 1000);
 * });
 * ```
 */
export const handlePromises: ExtensionHandlerEnhancer = create => () => {
  const handler = create();
  return (body, callback) => {
    handler(body, (err, resultOrPromise) => {
      Promise.resolve(resultOrPromise)
        .then(result => callback(err, result))
        .catch(callback);
    });
  };
};
