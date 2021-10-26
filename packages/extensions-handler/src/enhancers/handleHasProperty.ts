import { BadRequestError } from '../errors/BadRequestError';
import { ExtensionHandlerEnhancer } from '../handler';

/**
 * This handler will throw `BadRequestError` if a given property does not
 * exist on the payload.
 *
 * @example
 * ```js
 * return createExtensibleHandler(handleHasProperty('abc'))
 * // Pass
 * { "abc": 'Hello, World!' };
 * // Fail
 * { "notAbc": 'Hello, World!' };
 * ```
 */
export const handleHasProperty = (
  property: string
): ExtensionHandlerEnhancer => create => () => {
  const handler = create();
  return (payload, callback) => {
    if (payload[property] === undefined || payload[property] === null) {
      throw new BadRequestError(
        `Request body must contain \`${property}\` property.`
      );
    }
    handler(payload, callback);
  };
};
