import { InternalError } from '../errors/InternalError';
import { ExtensionHandlerCallback, ExtensionHandlerEnhancer } from '../handler';

export type ExtensionFunction<
  Params extends object = {},
  Context extends object = {}
> = (parameters: Params, context: Context) => any;

export type HandlePayloadFunction = (payload: any) => any;

export type HandlePayloadFunctions = (
  payload: any,
  callback: ExtensionHandlerCallback
) => void;

export interface HandlePayloadFunctionsConfig {
  getFunctionKey: (payload: any) => string;
}

const DEFAULT_CONFIG: HandlePayloadFunctionsConfig = {
  getFunctionKey: (payload: any) => payload.event,
};

export const handlePayloadFunctions = <
  EventMap extends Record<string, HandlePayloadFunction>
>(
  functionMap: EventMap,
  options: HandlePayloadFunctionsConfig = DEFAULT_CONFIG
): ExtensionHandlerEnhancer => create => (): HandlePayloadFunctions => {
  const next = create();
  return (payload, callback) => {
    const functionKey = options.getFunctionKey(payload);

    if (typeof functionKey !== 'string') {
      throw new InternalError(
        '`functionKey` incorrectly defined in handlePayloadFunctions.'
      );
    }

    const fn = functionMap && functionMap[functionKey];
    if (typeof fn === 'function') {
      next(fn(payload), callback);
    } else {
      next(payload, callback);
    }
  };
};
