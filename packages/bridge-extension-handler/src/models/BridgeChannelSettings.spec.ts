import { BridgeChannelSettings } from './BridgeChannelSettings';

describe('model tests - BridgeChannelSettings', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setRuntimeData', async () => {
    const setting = new BridgeChannelSettings();
    setting.setRuntimeData({ key: 'value' });

    expect(setting).toHaveProperty('runtimeData');
    expect(setting.runtimeData).toEqual({ key: 'value' });
  });

  it('setThreadId', async () => {
    const setting = new BridgeChannelSettings();
    setting.setThreadId('DB_THREAD');

    expect(setting).toHaveProperty('threadId');
    expect(setting.threadId).toEqual('DB_THREAD');
  });

  it('setUserID', async () => {
    const setting = new BridgeChannelSettings();
    setting.setUserID('USER_ID');

    expect(setting).toHaveProperty('userId');
    expect(setting.userId).toEqual('USER_ID');
  });

  it('create', async () => {
    const setting = BridgeChannelSettings.create({
      runtimeData: { key: 'value' },
      threadId: 'UUID',
      userId: 'UUID',
    });

    expect(setting).toHaveProperty('runtimeData');
    expect(setting).toHaveProperty('threadId');
    expect(setting).toHaveProperty('userId');
  });

  it('toSerializableObject', async () => {
    const setting = BridgeChannelSettings.create({
      runtimeData: { key: 'value' },
      threadId: 'UUID',
      userId: 'UUID',
    });

    const actual = setting.toSerializableObject();

    expect(actual).toHaveProperty('requestUUID');
    expect(actual.requestUUID).toEqual('UUID');
    expect(actual).toHaveProperty('runtimeCTX');
    expect(actual).toHaveProperty('userUUID');
    expect(actual.userUUID).toEqual('UUID');
  });
});
