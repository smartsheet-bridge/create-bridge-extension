import { BadRequestError } from '../errors/BadRequestError';
import { handleHasProperty } from './handleHasProperty';

describe('Has Property Payload', () => {
  it('should throw error if no `abc` is found on body', () => {
    const fn = handleHasProperty('abc')(jest.fn())();

    // @ts-ignore
    expect(() => fn({}, () => {})).toThrowError(
      new BadRequestError('Request body must contain `abc` property.')
    );
  });
  it('should pass through if `abc` is found on body', () => {
    const handler = jest.fn();
    const create = jest.fn(() => handler);
    const fn = handleHasProperty('abc')(create)();

    const payload = {
      abc: 'def',
    };
    const cb = jest.fn();
    expect(() => fn(payload, cb)).not.toThrowError();
    expect(create).toBeCalled();
    expect(handler).toBeCalledWith(payload, cb);
    expect(cb).not.toBeCalled();
  });
});
