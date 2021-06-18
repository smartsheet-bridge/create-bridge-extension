import { MediaChannelMessage } from './MediaChannelMessage';

describe('model tests - MediaChannelMessage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setData', async () => {
    const channelMessage = new MediaChannelMessage();
    channelMessage.setData({ key: 'value' });

    expect(channelMessage).toHaveProperty('data');
    expect(channelMessage.data).toEqual({ key: 'value' });
  });

  it('setType', async () => {
    const channelMessage = new MediaChannelMessage();
    channelMessage.setType('MAP');

    expect(channelMessage).toHaveProperty('type');
    expect(channelMessage.type).toEqual('MAP');
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
      type: 'MAP',
      data: { key: 'value' },
    });

    expect(channelMessage).toHaveProperty('uid');
    expect(channelMessage.uid).toEqual('unique');
    expect(channelMessage).toHaveProperty('data');
    expect(channelMessage).toHaveProperty('type');
    expect(channelMessage.data).toEqual({ key: 'value' });
    expect(channelMessage.type).toEqual('MAP');
  });

  it('toSerializableObject', async () => {
    const channelMessage = MediaChannelMessage.create({
      uid: 'unique',
      type: 'MAP',
      data: { key: 'value' },
    });

    const actual = channelMessage.toSerializableObject();

    expect(actual).toHaveProperty('uid');
    expect(actual.uid).toEqual('unique');
    expect(actual).toHaveProperty('media');
    expect(actual.media).toHaveProperty('type');
    expect((actual.media as any).type).toEqual('MAP');
    expect(actual.media).toHaveProperty('entity');
    expect((actual.media as any).entity).toEqual({ key: 'value' });
  });
});
