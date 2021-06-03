import { TextChannelMessage } from './TextChannelMessage';

describe('model tests - TextChannelMessage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setText', async () => {
    const response = new TextChannelMessage();
    response.setText('text message');

    expect(response).toHaveProperty('text');
    expect(response.text).toEqual('text message');
  });

  it('setUid', async () => {
    const response = TextChannelMessage.create();
    response.setUid('unique');

    expect(response).toHaveProperty('uid');
    expect(response.uid).toEqual('unique');
  });

  it('create', async () => {
    const response = TextChannelMessage.create({
      uid: 'unique',
      text: 'text message',
    });

    expect(response).toHaveProperty('text');
    expect(response.text).toEqual('text message');
    expect(response).toHaveProperty('uid');
    expect(response.uid).toEqual('unique');
  });
});
