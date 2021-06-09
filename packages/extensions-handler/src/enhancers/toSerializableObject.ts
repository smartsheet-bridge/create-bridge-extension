import { ExtensionHandlerEnhancer } from '../handler';
import { serialize } from '../utils/serializable';

/**
 * An enhancer that serializes implementations of SerializableClass.
 */
export const toSerializableObject: ExtensionHandlerEnhancer = create => () => {
  const handler = create();

  return (payload, callback) => {
    handler(payload, (err, result) => {
      callback(err, serialize(result));
    });
  };
};
