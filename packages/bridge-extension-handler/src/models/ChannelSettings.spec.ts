import { ChannelSettings } from './ChannelSettings';
import { ChannelUserInfo } from './ChannelUserInfo';

describe('model tests - ChannelSettings', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setChannelName', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setChannelName('bridge');

    expect(channelSettings).toHaveProperty('channelName');
    expect(channelSettings.channelName).toEqual('bridge');
  });

  it('setData', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setData({ key: 'value' });

    expect(channelSettings).toHaveProperty('data');
    expect(channelSettings.data).toEqual({ key: 'value' });
  });

  it('setIsSync', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setIsSync(true);

    expect(channelSettings).toHaveProperty('sync');
    expect(channelSettings.sync).toEqual(true);
  });

  it('setIsGroup', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setIsGroup(true);

    expect(channelSettings).toHaveProperty('isGroup');
    expect(channelSettings.isGroup).toEqual(true);
  });

  it('setRequestUUID', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setRequestUUID('uuid');

    expect(channelSettings).toHaveProperty('requestUUID');
    expect(channelSettings.requestUUID).toEqual('uuid');
  });

  it('setRuntimeCTX', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setRuntimeCTX({ key: 'value' });

    expect(channelSettings).toHaveProperty('runtimeCTX');
    expect(channelSettings.runtimeCTX).toEqual({ key: 'value' });
  });

  it('setThreadId', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setThreadId('DB_THREAD');

    expect(channelSettings).toHaveProperty('threadId');
    expect(channelSettings.threadId).toEqual('DB_THREAD');
  });

  it('setUserID', async () => {
    const channelSettings = new ChannelSettings();
    channelSettings.setUserID('USER_ID');

    expect(channelSettings).toHaveProperty('userId');
    expect(channelSettings.userId).toEqual('USER_ID');
  });

  it('setUserInfo', async () => {
    const userInfo = ChannelUserInfo.create({ email: 'user@example.com' });

    const channelSettings = new ChannelSettings();
    channelSettings.setUserInfo(userInfo);

    expect(channelSettings).toHaveProperty('userInfo');
    expect(channelSettings.userInfo).toHaveProperty('email');
    expect(channelSettings.userInfo.email).toEqual('user@example.com');
  });

  it('setUserUUID', async () => {
    const channelSettings = ChannelSettings.create();
    channelSettings.setUserUUID('UUID');

    expect(channelSettings).toHaveProperty('userUUID');
    expect(channelSettings.userUUID).toEqual('UUID');
  });

  it('create', async () => {
    const channelSettings = ChannelSettings.create({
      channelName: 'channel',
      data: { key: 'value' },
      isGroup: true,
      requestUUID: 'UUID',
      runtimeCTX: { key: 'value' },
      sync: true,
      threadId: 'THREAD',
      userId: 'USER',
      userInfo: ChannelUserInfo.create(),
      userUUID: 'UUID',
    });

    expect(channelSettings).toHaveProperty('channelName');
    expect(channelSettings).toHaveProperty('data');
    expect(channelSettings).toHaveProperty('isGroup');
    expect(channelSettings).toHaveProperty('requestUUID');
    expect(channelSettings).toHaveProperty('runtimeCTX');
    expect(channelSettings).toHaveProperty('sync');
    expect(channelSettings).toHaveProperty('threadId');
    expect(channelSettings).toHaveProperty('userId');
    expect(channelSettings).toHaveProperty('userInfo');
    expect(channelSettings).toHaveProperty('userUUID');
  });
});
