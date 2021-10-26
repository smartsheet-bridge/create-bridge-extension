import { InternalError } from '../errors/InternalError';
import {
  ExtensionHandler,
  ExtensionHandlerCallback,
  ExtensionHandlerEnhancer,
  ExtensionHandlerEnhancerCreate,
} from '../handler';

export type HandlePayloadFunctions = (
  payload: any,
  callback: ExtensionHandlerCallback
) => void;

export interface HandlePayloadFunctionsConfig {
  getFunctionKey: (payload: any) => string;
}

const DEFAULT_CONFIG: HandlePayloadFunctionsConfig = {
  getFunctionKey: (payload: any) => payload && payload.event,
};

function mapValues(
  obj: Record<string, ExtensionHandlerEnhancer>,
  fn: ExtensionHandlerEnhancerCreate
): Record<keyof typeof obj, ExtensionHandler> {
  return Object.keys(obj).reduce(
    (result, key) => ({
      ...result,
      [key]: obj[key](fn)(),
    }),
    {}
  );
}

/**
 * This handler will call one and only one enhancer based on the payload key.
 * It acts as an exclusive OR, or switch statment.
 * @param enhancers a key value map where the key is a string and the value is an enhancer.
 * @param options
 */
export const xorHandler = <
  EventMap extends Record<string, ExtensionHandlerEnhancer>
>(
  enhancers: EventMap,
  options: HandlePayloadFunctionsConfig = DEFAULT_CONFIG
): ExtensionHandlerEnhancer => create => (): HandlePayloadFunctions => {
  const fns = mapValues(enhancers, create);

  return (payload, callback) => {
    const enhancerKey = options.getFunctionKey(payload);

    if (typeof enhancerKey !== 'string') {
      throw new InternalError(
        '`enhancerKey` incorrectly defined in `xorHandler`.'
      );
    }

    const handler = fns[enhancerKey];
    if (typeof handler === 'function') {
      handler(payload, callback);
    }
  };
};
