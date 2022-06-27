import {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

type ReadonlySome<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

export interface BridgeHTTPRequestConfig
  extends ReadonlySome<
    AxiosRequestConfig,
    'url' | 'method' | 'maxContentLength' | 'maxBodyLength'
  > {
  token?: string;
}

export type BridgeHTTPResponse<T = any> = AxiosResponse<T>;

export interface BridgeHTTPInstance extends AxiosInstance {
  (config: BridgeHTTPRequestConfig): AxiosPromise;
  (url: string, config?: BridgeHTTPRequestConfig): AxiosPromise;
  defaults: BridgeHTTPRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<BridgeHTTPRequestConfig>;
    response: AxiosInterceptorManager<BridgeHTTPResponse>;
  };
  request<T = any, R = BridgeHTTPResponse<T>>(
    config: BridgeHTTPRequestConfig
  ): Promise<R>;
  get<T = any, R = BridgeHTTPResponse<T>>(
    url: string,
    config?: BridgeHTTPRequestConfig
  ): Promise<R>;
  delete<T = any, R = BridgeHTTPResponse<T>>(
    url: string,
    config?: BridgeHTTPRequestConfig
  ): Promise<R>;
  post<T = any, R = BridgeHTTPResponse<T>>(
    url: string,
    data?: any,
    config?: BridgeHTTPRequestConfig
  ): Promise<R>;
}
