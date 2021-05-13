import { JSONArray, JSONObject, JSONPrimitive } from '../types';

export const isJSONPrimitive = (o: unknown): o is JSONPrimitive =>
  typeof o === 'string' ||
  typeof o === 'number' ||
  typeof o === 'boolean' ||
  o === null;

export const isJSONArray = (o: unknown): o is JSONArray => Array.isArray(o);

export const isJSONObject = (o: unknown): o is JSONObject =>
  typeof o !== 'function' && !isJSONPrimitive(o) && !isJSONArray(o);

export const isSerializable = (o: unknown): o is JSONObject =>
  !isJSONPrimitive(o) && !Array.isArray(o) && typeof o !== 'function';
