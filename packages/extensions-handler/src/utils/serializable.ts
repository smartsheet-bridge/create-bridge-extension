export type SerializableEmpty = null | undefined;
export type SerializablePrimitive = string | number | boolean;
export interface SerializableObject extends Record<string, SerializableValue> {
  [member: string]: SerializableValue;
}
export type SerializableArray = Array<SerializableValue>;
export type SerializableValue =
  | SerializableEmpty
  | SerializablePrimitive
  | SerializableObject
  | SerializableArray;

export const isSerializableEmpty = (o: unknown): o is SerializableEmpty =>
  o === null || o === undefined;

export const isSerializablePrimitive = (
  o: unknown
): o is SerializablePrimitive =>
  typeof o === 'string' || typeof o === 'number' || typeof o === 'boolean';

export const isSerializableArray = (o: unknown): o is SerializableArray =>
  Array.isArray(o) && o.every(isSerializable);

export const isSerializableObject = (o: unknown): o is SerializableObject =>
  typeof o !== 'function' &&
  !isSerializableEmpty(o) &&
  !isSerializablePrimitive(o) &&
  !isSerializableArray(o) &&
  Object.values(o).every(isSerializable);

export const isSerializable = (o: unknown): o is SerializableObject =>
  isSerializableEmpty(o) ||
  isSerializablePrimitive(o) ||
  isSerializableArray(o) ||
  isSerializableObject(o);
