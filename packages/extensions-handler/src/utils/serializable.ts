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

export const isSerializable = (o: unknown): o is SerializableValue =>
  isSerializableEmpty(o) ||
  isSerializablePrimitive(o) ||
  isSerializableArray(o) ||
  isSerializableObject(o);

export interface SerializableClass {
  toSerializableObject: () => SerializableObject;
}

export const isSerializableClass = (o: unknown): o is SerializableClass =>
  typeof o === 'object' &&
  typeof (o as SerializableClass).toSerializableObject === 'function';

export const serialize = (o: unknown): SerializableValue => {
  if (isSerializablePrimitive(o) || isSerializableEmpty(o)) {
    return o;
  }

  if (isSerializableClass(o)) {
    return o.toSerializableObject();
  }

  if (Array.isArray(o)) {
    return serializeArray(o);
  }

  if (typeof o === 'object' && !Array.isArray(o) && typeof o !== 'function') {
    return serializeObject(o);
  }
};

export const serializeArray = (a: any[]): SerializableArray =>
  a.map(serialize).filter(e => e !== undefined);

export const serializeObject = (o: object): SerializableObject =>
  Object.entries(o).reduce(
    (json, [key, value]) => ({ ...json, [key]: serialize(value) }),
    {}
  );
