export type ExtensionHandlerCallback = (result?: any) => void;

export type ExtensionHandler = (...args: any[]) => void;

export type DefaultExtensionHandler = (
  payload: any,
  callback: ExtensionHandlerCallback
) => void;

export interface RequestPayload<Event extends string> {
  event: Event;
}

export type ExtensionHandlerEnhancer<
  ReturnHandler extends ExtensionHandler = DefaultExtensionHandler,
  NextHandler extends ExtensionHandler = DefaultExtensionHandler
> = (
  extensibleHandler: ExtensionHandlerEnhancerCreate<NextHandler>
) => ExtensionHandlerEnhancerCreate<ReturnHandler>;

export type ExtensionHandlerEnhancerCreate<
  Handler extends ExtensionHandler = ExtensionHandler
> = () => Handler;
type InferEnhancerReturn<T> = T extends ExtensionHandlerEnhancer<infer U>
  ? U
  : T;

const isEnhancer = <T>(fn: unknown): fn is T => typeof fn === 'function';

export function createExtensionHandler(): ExtensionHandler;

export function createExtensionHandler<
  Enhancer extends ExtensionHandlerEnhancer<ExtensionHandler, ExtensionHandler>,
  Handler = InferEnhancerReturn<Enhancer>
>(enhancer: Enhancer): Handler;

export function createExtensionHandler<
  Enhancer extends ExtensionHandlerEnhancer<ExtensionHandler, ExtensionHandler>,
  Handler = InferEnhancerReturn<Enhancer>
>(enhancer?: Enhancer): ExtensionHandler | Handler | never {
  if (enhancer !== undefined) {
    if (!isEnhancer<Enhancer>(enhancer)) {
      throw new Error(
        'Invalid Configuration! Expected enhancer to be a function.'
      );
    }
    return enhancer(createExtensionHandler)();
  }

  return (payload, callback) => {
    if (typeof callback !== 'function') {
      throw new Error(
        `Invalid Configuration! Cannot call a callback function of type '${typeof callback}'`
      );
    }
    callback(payload);
  };
}
