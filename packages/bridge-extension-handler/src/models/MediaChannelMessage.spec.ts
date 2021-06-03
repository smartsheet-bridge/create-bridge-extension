import { MediaChannelMessage } from './MediaChannelMessage';

describe('model tests - MediaChannelMessage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setData', async () => {
    const channelMessage = new MediaChannelMessage();
    channelMessage.setData({ key: 'value' });

    expect(channelMessage).toHaveProperty('media');
    expect(channelMessage.media).toHaveProperty('entity');
    expect(channelMessage.media.entity).toEqual({ key: 'value' });
  });

  it('setMedia', async () => {
    const channelMessage = new MediaChannelMessage();
    channelMessage.setMedia({ type: 'MAP', entity: { key: 'value' } });

    expect(channelMessage).toHaveProperty('media');
    expect(channelMessage.media).toHaveProperty('entity');
    expect(channelMessage.media).toHaveProperty('type');
    expect(channelMessage.media.entity).toEqual({ key: 'value' });
    expect(channelMessage.media.type).toEqual('MAP');
  });

  it('setType', async () => {
    const channelMessage = new MediaChannelMessage();
    channelMessage.setType('MAP');

    expect(channelMessage).toHaveProperty('media');
    expect(channelMessage.media).toHaveProperty('type');
    expect(channelMessage.media.type).toEqual('MAP');
  });

  it('setUid', async () => {
    const channelMessage = MediaChannelMessage.create();
    channelMessage.setUid('unique');

    expect(channelMessage).toHaveProperty('uid');
    expect(channelMessage.uid).toEqual('unique');
  });

  it('create', async () => {
    const channelMessage = MediaChannelMessage.create({
      uid: 'unique',
      media: { type: 'MAP', entity: { key: 'value' } },
    });

    expect(channelMessage).toHaveProperty('uid');
    expect(channelMessage.uid).toEqual('unique');
    expect(channelMessage).toHaveProperty('media');
    expect(channelMessage.media).toHaveProperty('entity');
    expect(channelMessage.media).toHaveProperty('type');
    expect(channelMessage.media.entity).toEqual({ key: 'value' });
    expect(channelMessage.media.type).toEqual('MAP');
  });
});
