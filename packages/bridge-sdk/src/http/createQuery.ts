import { createAPICall } from '../utils';
import { BridgeHTTPInstance, BridgeHTTPRequestConfig } from './types';

export interface BridgeHTTPQuery {
  fromRecord: number;
  maxRecords: number;
  orderBy: BridgeHTTPQueryOrder[];
  filters?: BridgeSDKQueryFilter[];
  page: number;
}

export interface BridgeHTTPQueryOrder {
  field: string;
  ascending: boolean;
}

export interface BridgeSDKQueryFilter {
  field: string;
  condition: BridgeHTTPFilterCondition;
  value: string[];
}

export const IS_EQUAL_TO = 'IS_EQUAL_TO';
export const IS_NOT_EQUAL_TO = 'IS_NOT_EQUAL_TO';
export const IS_GREATER_THAN = 'IS_GREATER_THAN';
export const IS_LESS_THAN = 'IS_LESS_THAN';
export const IS_GREATER_THAN_EQUAL = 'IS_GREATER_THAN_EQUAL';
export const IS_LESS_THAN_EQUAL = 'IS_LESS_THAN_EQUAL';
export const IS_IN = 'IS_IN';
export const IS_NOT_IN = 'IS_NOT_IN';

export type BridgeHTTPFilterCondition =
  | typeof IS_EQUAL_TO
  | typeof IS_NOT_EQUAL_TO
  | typeof IS_GREATER_THAN
  | typeof IS_LESS_THAN
  | typeof IS_GREATER_THAN_EQUAL
  | typeof IS_LESS_THAN_EQUAL
  | typeof IS_IN
  | typeof IS_NOT_IN;

export default (resource: string) =>
  createAPICall(
    (instance: BridgeHTTPInstance) => (
      { page, ...query }: BridgeHTTPQuery,
      config?: BridgeHTTPRequestConfig
    ) => instance.post(`query/${resource}?pagination=${page}`, query, config)
  );
