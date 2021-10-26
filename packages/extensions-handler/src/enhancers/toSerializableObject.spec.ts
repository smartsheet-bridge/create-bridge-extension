import { createExtensionHandler } from '../handler';
import { SerializableClass, SerializableObject } from '../utils/serializable';
import { toSerializableObject } from './toSerializableObject';

describe('toSerializableObject', () => {
  class TestResponse implements SerializableClass {
    private a: number = 0;

    public setA(a: number) {
      this.a = a;
    }

    toSerializableObject(): SerializableObject {
      return {
        a: this.a,
        b: 0,
      };
    }
  }

  it('should call callback with serializable object', () => {
    const cb = jest.fn();
    const extensibleHandler = createExtensionHandler(toSerializableObject);
    const response = new TestResponse();
    response.setA(1);
    extensibleHandler(response, cb);
    expect(cb).toHaveBeenCalledWith(null, { b: 0, a: 1 });
  });

  it('should call callback without serializable object', () => {
    const cb = jest.fn();
    const extensibleHandler = createExtensionHandler(toSerializableObject);
    extensibleHandler({ a: 1 }, cb);
    expect(cb).toHaveBeenCalledWith(null, { a: 1 });
  });
});
