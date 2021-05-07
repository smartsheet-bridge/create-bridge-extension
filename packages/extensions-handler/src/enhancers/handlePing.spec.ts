import { handlePing } from './handlePing';

describe('External Payload', () => {
  it('should call callback', () => {
    const cb = jest.fn();
    const fn = handlePing()(jest.fn())();
    fn(
      {
        event: 'PING',
      },
      cb
    );
    expect(cb).toBeCalled();
  });
  it('should pass through if event not PING', () => {
    const handler = jest.fn();
    const create = jest.fn(() => handler);
    const fn = handlePing()(create)();

    const cb = jest.fn();
    const payload = {
      event: 'NOT_PING',
    };

    fn(payload, cb);
    expect(create).toBeCalled();
    expect(handler).toBeCalledWith(payload, cb);
    expect(cb).not.toBeCalled();
  });
});
