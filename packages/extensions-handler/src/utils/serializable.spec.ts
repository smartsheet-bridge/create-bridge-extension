import {
  isSerializableArray,
  isSerializableEmpty,
  isSerializableObject,
  isSerializablePrimitive,
  SerializableClass,
  SerializableObject,
  SerializableValue,
  serialize,
} from './serializable';

const STRING = 'str';
const NUMBER = 1;
const NUMBER_DECIMAL = 0.5;
const NUMBER_BIG = -Number.MAX_VALUE;
const TRUE = true;
const FALSE = false;
const FN_NAMED = function fn() {};
const FN_ARROW = () => {};
class TestClass implements SerializableClass {
  public a = STRING;
  public setA() {
    this.a = STRING;
  }
  public toSerializableObject(): SerializableObject {
    return {
      a: this.a,
      b: NUMBER,
    };
  }
}
const CLASS = new TestClass();
const SERIALIZED_CLASS = { a: STRING, b: NUMBER };

// Used to create a 2D array for test.each as a 1D array is interpreted
// differently depending on whether primitives or arrays are passed.
const createTestValues = (given: any[]): any[][] => given.map(v => [v]);

const EMPTY_TESTS = [undefined, null];
const PRIMITIVES_TESTS = [
  STRING,
  NUMBER,
  TRUE,
  FALSE,
  NUMBER_DECIMAL,
  NUMBER_BIG,
];
const OBJECT_SUCCESS_TESTS = [
  {},
  { a: STRING },
  { a: { b: STRING } },
  { a: PRIMITIVES_TESTS },
];

const OBJECT_CLASS_SUCCESS_TESTS = [CLASS, { a: CLASS }, { a: { b: CLASS } }];

const ARRAY_SUCCESS_TESTS = [[], PRIMITIVES_TESTS, OBJECT_SUCCESS_TESTS];

const ARRAY_CLASS_SUCCESS_TESTS = [[CLASS], [[CLASS]], [[[CLASS]]]];

const FN_FAILURE_TESTS = [FN_NAMED, FN_ARROW];
const OBJECT_FAILURE_TESTS = [
  { a: FN_NAMED },
  { a: FN_ARROW },
  { a: { b: FN_ARROW } },
];
const ARRAY_FAILURE_TESTS = [
  [FN_NAMED],
  [FN_ARROW],
  FN_FAILURE_TESTS,
  OBJECT_FAILURE_TESTS,
];

describe('serializable', () => {
  describe('empties (null & undefined)', () => {
    it.each(createTestValues(EMPTY_TESTS))('returns true when given %s', o => {
      expect(isSerializableEmpty(o)).toBe(true);
    });
    it.each(
      createTestValues([
        ...PRIMITIVES_TESTS,
        ...ARRAY_SUCCESS_TESTS,
        ...ARRAY_CLASS_SUCCESS_TESTS,
        ...OBJECT_SUCCESS_TESTS,
        ...OBJECT_CLASS_SUCCESS_TESTS,
        ...FN_FAILURE_TESTS,
        ...ARRAY_FAILURE_TESTS,
        ...OBJECT_FAILURE_TESTS,
      ])
    )('returns false when given %s', o => {
      expect(isSerializableEmpty(o)).toBe(false);
    });
  });
  describe('primitives', () => {
    it.each(createTestValues(PRIMITIVES_TESTS))(
      'returns true when given %s',
      o => {
        expect(isSerializablePrimitive(o)).toBe(true);
      }
    );
    it.each(
      createTestValues([
        ...EMPTY_TESTS,
        ...ARRAY_SUCCESS_TESTS,
        ...ARRAY_CLASS_SUCCESS_TESTS,
        ...OBJECT_SUCCESS_TESTS,
        ...OBJECT_CLASS_SUCCESS_TESTS,
        ...FN_FAILURE_TESTS,
        ...ARRAY_FAILURE_TESTS,
        ...OBJECT_FAILURE_TESTS,
      ])
    )('returns false when given %s', o => {
      expect(isSerializablePrimitive(o)).toBe(false);
    });
  });
  describe('arrays', () => {
    it.each(createTestValues(ARRAY_SUCCESS_TESTS))(
      'returns true when given %s',
      o => {
        expect(isSerializableArray(o)).toBe(true);
      }
    );
    it.each(
      createTestValues([
        ...EMPTY_TESTS,
        ...PRIMITIVES_TESTS,
        ...OBJECT_SUCCESS_TESTS,
        ...OBJECT_CLASS_SUCCESS_TESTS,
        ...FN_FAILURE_TESTS,
        ...ARRAY_FAILURE_TESTS,
        ...OBJECT_FAILURE_TESTS,
      ])
    )('returns false when given %s', o => {
      expect(isSerializableArray(o)).toBe(false);
    });
  });
  describe('objects', () => {
    it.each(createTestValues(OBJECT_SUCCESS_TESTS))(
      'returns true when given %s',
      o => {
        expect(isSerializableObject(o)).toBe(true);
      }
    );
    it.each(
      createTestValues([
        ...EMPTY_TESTS,
        ...PRIMITIVES_TESTS,
        ...ARRAY_SUCCESS_TESTS,
        ...ARRAY_CLASS_SUCCESS_TESTS,
        ...FN_FAILURE_TESTS,
        ...ARRAY_FAILURE_TESTS,
        ...OBJECT_FAILURE_TESTS,
      ])
    )('returns false when given %s', o => {
      expect(isSerializableObject(o)).toBe(false);
    });
  });

  describe('serialize', () => {
    it.each(
      createTestValues([
        ...EMPTY_TESTS,
        ...PRIMITIVES_TESTS,
        ...ARRAY_SUCCESS_TESTS,
        ...OBJECT_SUCCESS_TESTS,
      ])
    )('serializes %s successfully', (given, expected = given) => {
      expect(serialize(given)).toEqual(expected);
    });
    it.each([
      [{ a: FN_ARROW }, {}],
      [{ a: FN_ARROW, b: NUMBER }, { b: NUMBER }],
      [{ a: { b: FN_ARROW } }, { a: {} }],
      [{ a: { b: FN_ARROW, c: NUMBER } }, { a: { c: NUMBER } }],
      [[FN_ARROW], []],
      [
        [NUMBER, FN_ARROW, STRING],
        [NUMBER, STRING],
      ],
      [
        [
          [NUMBER, FN_ARROW, STRING],
          [NUMBER, FN_ARROW, STRING],
        ],
        [
          [NUMBER, STRING],
          [NUMBER, STRING],
        ],
      ],
    ] as Array<[any, SerializableValue]>)(
      'serializes %s successfully by removing functions',
      (given, expected = given) => {
        expect(serialize(given)).toEqual(expected);
      }
    );
    it.each([
      [CLASS, SERIALIZED_CLASS],
      [{ a: CLASS }, { a: SERIALIZED_CLASS }],
      [{ a: { b: CLASS } }, { a: { b: SERIALIZED_CLASS } }],
      [[CLASS], [SERIALIZED_CLASS]],
      [[[CLASS]], [[SERIALIZED_CLASS]]],
      [[[[CLASS]]], [[[SERIALIZED_CLASS]]]],
    ] as Array<[any, SerializableValue]>)(
      'serializes %s successfully by serializing class',
      (given, expected = given) => {
        expect(serialize(given)).toEqual(expected);
      }
    );
  });
});
