import { TriggerWorkflowChannelMessage } from './TriggerWorkflowChannelMessage';

describe('model tests - TriggerWorkflowChannelMessage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setUid', async () => {
    const message = new TriggerWorkflowChannelMessage();
    message.setUid('unique');

    expect(message).toHaveProperty('uid');
    expect(message.uid).toEqual('unique');
  });

  it('setRuntimeData', async () => {
    const message = new TriggerWorkflowChannelMessage();
    message.setRuntimeData({ key: 'value' });

    expect(message).toHaveProperty('runtimeData');
    expect(message.runtimeData).toHaveProperty('key');
    expect(message.runtimeData).toEqual({ key: 'value' });
  });

  it('setStateValues', async () => {
    const message = new TriggerWorkflowChannelMessage();
    message.setStateValues({ key: 'value' });

    expect(message).toHaveProperty('stateValues');
    expect(message.stateValues).toEqual({ key: 'value' });
  });

  it('setWorkflowId', async () => {
    const message = TriggerWorkflowChannelMessage.create();
    message.setWorkflowId('NEW');

    expect(message).toHaveProperty('workflowID');
    expect(message.workflowID).toEqual('NEW');
  });

  it('create', async () => {
    const message = TriggerWorkflowChannelMessage.create({
      uid: 'unique',
      workflowID: 'NEW',
    });

    expect(message).toHaveProperty('uid');
    expect(message.uid).toEqual('unique');
    expect(message).toHaveProperty('workflowID');
    expect(message.workflowID).toEqual('NEW');
  });

  it('toSerializableObject', async () => {
    const message = TriggerWorkflowChannelMessage.create({
      uid: 'unique',
      workflowID: 'NEW',
      runtimeData: { key: 'value' },
      stateValues: { key: 'value' },
    });

    const actual = message.toSerializableObject();

    expect(actual).toHaveProperty('uid');
    expect(actual.uid).toEqual('unique');
    expect(actual).toHaveProperty('conversation');
    expect(actual.conversation).toHaveProperty('new');
    expect(actual.conversation).toHaveProperty('entityData');
    expect(actual.conversation).toHaveProperty('runtimeCTX');
    expect((actual.conversation as any).new).toEqual('NEW');
  });
});
