import { RestartWorkflowChannelMessage } from './RestartWorkflowChannelMessage';

describe('model tests - RestartWorkflowChannelMessage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setUid', async () => {
    const message = new RestartWorkflowChannelMessage();
    message.setUid('unique');

    expect(message).toHaveProperty('uid');
    expect(message.uid).toEqual('unique');
  });

  it('setRuntimeData', async () => {
    const message = new RestartWorkflowChannelMessage();
    message.setRuntimeData({ key: 'value' });

    expect(message).toHaveProperty('runtimeData');
    expect(message.runtimeData).toHaveProperty('key');
    expect(message.runtimeData).toEqual({ key: 'value' });
  });

  it('setStateValues', async () => {
    const message = new RestartWorkflowChannelMessage();
    message.setStateValues({ key: 'value' });

    expect(message).toHaveProperty('stateValues');
    expect(message.stateValues).toEqual({ key: 'value' });
  });

  it('setWorkflowRunId', async () => {
    const message = RestartWorkflowChannelMessage.create();
    message.setWorkflowRunId('NEW');

    expect(message).toHaveProperty('workflowRunID');
    expect(message.workflowRunID).toEqual('NEW');
  });

  it('create', async () => {
    const message = RestartWorkflowChannelMessage.create({
      uid: 'unique',
      workflowRunID: 'EXISTING',
    });

    expect(message).toHaveProperty('uid');
    expect(message.uid).toEqual('unique');
    expect(message).toHaveProperty('workflowRunID');
    expect(message.workflowRunID).toEqual('EXISTING');
  });

  it('toSerializableObject', async () => {
    const message = RestartWorkflowChannelMessage.create({
      uid: 'unique',
      workflowRunID: 'EXISTING',
      runtimeData: { key: 'value' },
      stateValues: { key: 'value' },
    });

    const actual = message.toSerializableObject();

    expect(actual).toHaveProperty('uid');
    expect(actual.uid).toEqual('unique');
    expect(actual).toHaveProperty('conversation');
    expect(actual.conversation).toHaveProperty('existing');
    expect(actual.conversation).toHaveProperty('entityData');
    expect(actual.conversation).toHaveProperty('runtimeCTX');
    expect((actual.conversation as any).existing).toEqual('EXISTING');
  });
});
