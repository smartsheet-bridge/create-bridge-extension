import {
  BridgeHTTPInstance,
  BridgeHTTPRequestConfig,
  BridgeHTTPResponse,
} from './http';
import createInstance, { isBridgeHTTPInstance } from './http/createInstance';

export interface AccountURL {
  accountName: string;
  hostName: string;
  protocol: string;
}

export const parseAccountURL = (accountURL: string): AccountURL => {
  if (!accountURL.startsWith('http')) {
    accountURL = `https://${accountURL}`;
  }
  const url = new URL(accountURL);

  const [accountName, ...rest] = url.host.split('.');
  const hostName = rest.join('.');
  const protocol = url.protocol.slice(0, -1);

  return {
    accountName,
    hostName,
    protocol,
  };
};

type HTTPFn = (
  data: { [key: string]: any },
  config: BridgeHTTPRequestConfig
) => Promise<BridgeHTTPResponse>;
type HTTPCall = (instance: BridgeHTTPInstance) => HTTPFn;

interface HTTPMap {
  [call: string]: HTTPCall;
}

type HTTPModule = (
  instance: BridgeHTTPInstance
) => { [call: string]: HTTPCall };

/**
 * Returns a function that allows the caller to execute the given function in one of two ways.
 * 1. Exactly how it is supplied to the function.
 * 2. As a single function that can take the API arguments, and a request config parameter.
 *
 * @example
 * ```
 * // Given the following input.
 * const fn = createAPICall(instance => options => instance.post(options.data));
 * // fn can be executed as is:
 * fn(instance)(options);
 * // or
 * fn(options, config);
 * ```
 * You can also pass a BridgeHTTPRequestConfig option to override defaults.
 * ```
 * // Given the following input.
 * const fn = createAPICall(instance => (options, config) => instance.post(options.data));
 * // fn can be executed as is:
 * fn(instance)(options, config);
 * // or
 * fn(options, config);
 * ```
 */
export function createAPICall(
  fn: (
    instance: BridgeHTTPInstance
  ) => (config: BridgeHTTPRequestConfig) => Promise<BridgeHTTPResponse>
): {
  (instance: BridgeHTTPInstance): (
    config?: BridgeHTTPRequestConfig
  ) => Promise<BridgeHTTPResponse>;
  (config: BridgeHTTPRequestConfig): Promise<BridgeHTTPResponse>;
};
export function createAPICall<Options extends { [key: string]: any }>(
  fn: (
    instance: BridgeHTTPInstance
  ) => (
    options: Options,
    config: BridgeHTTPRequestConfig
  ) => Promise<BridgeHTTPResponse>
): {
  (instance: BridgeHTTPInstance): (
    options: Options,
    config?: BridgeHTTPRequestConfig
  ) => Promise<BridgeHTTPResponse>;
  (options: Options, config: BridgeHTTPRequestConfig): Promise<
    BridgeHTTPResponse
  >;
};
export function createAPICall(fn: any): any {
  return (...args: any[]) => {
    if (isBridgeHTTPInstance(args[0])) {
      return fn(args[0]);
    } else {
      const [config, data] = args.reverse() as [BridgeHTTPRequestConfig, any];
      const instance = createInstance(config);
      return fn(instance)(data);
    }
  };
}

type APICallReturn<T> = T extends {
  (...args: any[]): infer R;
  (...args: any[]): any;
}
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : any;

type InferMap<T extends HTTPMap> = {
  [P in keyof T]: APICallReturn<T[P]>;
};

/**
 * Will take a map of curried API calls and return a function that will
 * execute the first function in the function-chain of each item in the map.
 * @example
 * const firstCall: instance => options => Promise;
 * const secondCall: instance => options => Promise;
 * const allCalls = createAPIModule({ firstCall, secondCall });
 *
 * // Produces
 * // {
 * //   fistCall: options => Promise;
 * //   secondCall: options => Promise;
 * // }
 */
export const createAPIModule = <Fns extends HTTPMap, Return = InferMap<Fns>>(
  fns: Fns
): ((instance: BridgeHTTPInstance) => Return) => {
  const keys = Object.keys(fns);
  return (instance: BridgeHTTPInstance) =>
    keys.reduce(
      (map, key) => ({
        ...map,
        [key]: fns[key](instance),
      }),
      {} as Return
    );
};
