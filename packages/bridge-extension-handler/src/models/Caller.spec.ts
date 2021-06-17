import { Caller } from './Caller';

describe('model tests - Caller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('create', async () => {
    const caller = Caller.create();
    caller.callTime = 1000;

    expect(caller).toHaveProperty('callTime');
    expect(caller.callTime).toEqual(1000);

    const expected = new Caller();
    expected.callTime = 1000;

    expect(caller).toEqual(expected);
  });

  it('constructor', async () => {
    const caller = new Caller({
      callTime: 1000,
      callToken: {
        signature: 'SIGNATURE',
        validUntil: 999999999,
      },
      installUUID: 'UUID',
      instanceID: 'UUID',
      invoker: {
        userUUID: 'UUID',
        email: 'admin@example.com',
      },
      msgid: 'ID',
      pluginUUID: 'UUID',
      provider: {
        providerDomain: 'example.bridge.smartsheet.com',
        providerUUID: 'UUID',
        workspaceUUID: 'UUID',
      },
      revision: 'v1',
    });

    expect(caller).toHaveProperty('callTime');
    expect(caller.callTime).toEqual(1000);
    expect(caller).toHaveProperty('callToken');
    expect(caller.callToken).toHaveProperty('signature');
    expect(caller.callToken).toHaveProperty('validUntil');
    expect(caller).toHaveProperty('invoker');
    expect(caller.invoker).toHaveProperty('email');
    expect(caller.invoker.email).toEqual('admin@example.com');
  });
});
