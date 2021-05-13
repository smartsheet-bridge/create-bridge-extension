export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
