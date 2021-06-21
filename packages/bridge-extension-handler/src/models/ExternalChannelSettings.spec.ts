import { ChannelUserInfo } from './ChannelUserInfo';
import { ExternalChannelSettings } from './ExternalChannelSettings';

describe('model tests - ExternalChannelSettings', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setChannelName', async () => {
    const channelSettings = new ExternalChannelSettings();
    channelSettings.setChannelName('bridge');

    expect(channelSettings).toHaveProperty('channelName');
    expect(channelSettings.channelName).toEqual('bridge');
  });

  it('setData', async () => {
    const channelSettings = new ExternalChannelSettings();
    channelSettings.setData({ key: 'value' });

    expect(channelSettings).toHaveProperty('data');
    expect(channelSettings.data).toEqual({ key: 'value' });
  });

  it('setIsSync', async () => {
    const channelSettings = new ExternalChannelSettings();
    channelSettings.setIsSync(true);

    expect(channelSettings).toHaveProperty('sync');
    expect(channelSettings.sync).toEqual(true);
  });

  it('setIsGroup', async () => {
    const channelSettings = new ExternalChannelSettings();
    channelSettings.setIsGroup(true);

    expect(channelSettings).toHaveProperty('isGroup');
    expect(channelSettings.isGroup).toEqual(true);
  });

  it('setRuntimeData', async () => {
    const channelSettings = new ExternalChannelSettings();
    channelSettings.setRuntimeData({ key: 'value' });

    expect(channelSettings).toHaveProperty('runtimeData');
    expect(channelSettings.runtimeData).toEqual({ key: 'value' });
  });

  it('setThreadId', async () => {
    const channelSettings = new ExternalChannelSettings();
    channelSettings.setThreadId('DB_THREAD');

    expect(channelSettings).toHaveProperty('threadId');
    expect(channelSettings.threadId).toEqual('DB_THREAD');
  });

  it('setUserID', async () => {
    const channelSettings = ExternalChannelSettings.create();
    channelSettings.setUserID('USER_ID');

    expect(channelSettings).toHaveProperty('userId');
    expect(channelSettings.userId).toEqual('USER_ID');
  });

  it('setUserInfo', async () => {
    const userInfo = ChannelUserInfo.create({ email: 'user@example.com' });

    const channelSettings = new ExternalChannelSettings();
    channelSettings.setUserInfo(userInfo);

    expect(channelSettings).toHaveProperty('userInfo');
    expect(channelSettings.userInfo).toHaveProperty('email');
    expect(channelSettings.userInfo.email).toEqual('user@example.com');
  });

  it('create', async () => {
    const channelSettings = ExternalChannelSettings.create({
      channelName: 'channel',
      data: { key: 'value' },
      isGroup: true,
      runtimeData: { key: 'value' },
      sync: true,
      threadId: 'THREAD',
      userId: 'USER',
      userInfo: ChannelUserInfo.create(),
    });

    expect(channelSettings).toHaveProperty('channelName');
    expect(channelSettings).toHaveProperty('data');
    expect(channelSettings).toHaveProperty('isGroup');
    expect(channelSettings).toHaveProperty('runtimeData');
    expect(channelSettings).toHaveProperty('sync');
    expect(channelSettings).toHaveProperty('threadId');
    expect(channelSettings).toHaveProperty('userId');
    expect(channelSettings).toHaveProperty('userInfo');
  });

  it('toSerializableObject', async () => {
    const channelSettings = ExternalChannelSettings.create({
      channelName: 'channel',
      data: { key: 'value' },
      isGroup: true,
      runtimeData: { key: 'value' },
      sync: true,
      threadId: 'THREAD',
      userId: 'USER',
      userInfo: ChannelUserInfo.create(),
    });

    const actual = channelSettings.toSerializableObject();

    expect(actual).toHaveProperty('channelName');
    expect(actual).toHaveProperty('data');
    expect(actual).toHaveProperty('isGroup');
    expect(actual).toHaveProperty('runtimeCTX');
    expect(actual).toHaveProperty('sync');
    expect(actual).toHaveProperty('threadId');
    expect(actual).toHaveProperty('userId');
    expect(actual).toHaveProperty('userInfo');
  });
});
