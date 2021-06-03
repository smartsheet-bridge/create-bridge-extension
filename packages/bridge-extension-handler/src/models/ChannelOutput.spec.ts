import { ChannelOutput } from './ChannelOutput';
import { ChannelSettings } from './ChannelSettings';
import { TextChannelMessage } from './TextChannelMessage';

describe('model tests - ChannelOutput', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setChannelMessage', async () => {
    const channelOutput = ChannelOutput.create();
    channelOutput.setChannelMessage(
      TextChannelMessage.create({ uid: 'unique', text: 'sample text' })
    );
    expect(channelOutput.channelMessage).toHaveProperty('uid');
    expect(channelOutput.channelMessage.uid).toEqual('unique');
    expect(channelOutput.channelMessage).toHaveProperty('text');

    const textMessage = channelOutput.channelMessage as TextChannelMessage;
    expect(textMessage.text).toEqual('sample text');
  });

  it('setChannelSetting', async () => {
    const channelOutput = new ChannelOutput();
    channelOutput.setChannelSetting(
      ChannelSettings.create({
        userId: 'user',
        threadId: 'DM_user',
        channelName: 'imagination',
      })
    );

    expect(channelOutput.channelSetting).toHaveProperty('userId');
    expect(channelOutput.channelSetting.userId).toEqual('user');
    expect(channelOutput.channelSetting).toHaveProperty('threadId');
    expect(channelOutput.channelSetting.threadId).toEqual('DM_user');
    expect(channelOutput.channelSetting).toHaveProperty('channelName');
    expect(channelOutput.channelSetting.channelName).toEqual('imagination');
  });

  it('create', async () => {
    const channelOutput = ChannelOutput.create({
      channelMessage: TextChannelMessage.create({
        uid: 'unique',
        text: 'sample text',
      }),
      channelSetting: ChannelSettings.create({
        userId: 'user',
        threadId: 'DM_user',
        channelName: 'imagination',
      }),
    });

    expect(channelOutput.channelMessage).toHaveProperty('uid');
    expect(channelOutput.channelMessage.uid).toEqual('unique');
    expect(channelOutput.channelMessage).toHaveProperty('text');

    const textMessage = channelOutput.channelMessage as TextChannelMessage;
    expect(textMessage.text).toEqual('sample text');

    expect(channelOutput.channelSetting).toHaveProperty('userId');
    expect(channelOutput.channelSetting.userId).toEqual('user');
    expect(channelOutput.channelSetting).toHaveProperty('threadId');
    expect(channelOutput.channelSetting.threadId).toEqual('DM_user');
    expect(channelOutput.channelSetting).toHaveProperty('channelName');
    expect(channelOutput.channelSetting.channelName).toEqual('imagination');
  });
});
