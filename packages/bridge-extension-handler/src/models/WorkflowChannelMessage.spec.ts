import { WorkflowChannelMessage } from './WorkflowChannelMessage';

describe('model tests - WorkflowChannelMessage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setUid', async () => {
    const response = new WorkflowChannelMessage();
    response.setUid('unique');

    expect(response).toHaveProperty('uid');
    expect(response.uid).toEqual('unique');
  });

  it('setRuntimeCTX', async () => {
    const response = new WorkflowChannelMessage();
    response.setRuntimeCTX({ key: 'value' });

    expect(response).toHaveProperty('conversation');
    expect(response.conversation).toHaveProperty('runtimeCTX');
    expect(response.conversation.runtimeCTX).toEqual({ key: 'value' });
  });

  it('setStateValues', async () => {
    const response = new WorkflowChannelMessage();
    response.setStateValues({ key: 'value' });

    expect(response).toHaveProperty('conversation');
    expect(response.conversation).toHaveProperty('entityData');
    expect(response.conversation.entityData).toEqual({ key: 'value' });
  });

  it('setWorkflow (new)', async () => {
    const response = new WorkflowChannelMessage();
    response.setWorkflow('new');

    expect(response).toHaveProperty('conversation');
    expect(response.conversation).toHaveProperty('new');
    expect(response.conversation.new).toEqual('new');
  });

  it('setWorkflow (new, false)', async () => {
    const response = new WorkflowChannelMessage();
    response.setWorkflow('new', false);

    expect(response).toHaveProperty('conversation');
    expect(response.conversation).toHaveProperty('new');
    expect(response.conversation.new).toEqual('new');
  });

  it('setWorkflow (existing, true)', async () => {
    const response = new WorkflowChannelMessage();
    response.setWorkflow('existing', true);

    expect(response).toHaveProperty('conversation');
    expect(response.conversation).toHaveProperty('existing');
    expect(response.conversation.existing).toEqual('existing');
  });

  it('setWorkflowTrigger', async () => {
    const response = WorkflowChannelMessage.create();
    response.setWorkflowTrigger({ new: 'NEW' });

    expect(response).toHaveProperty('conversation');
    expect(response.conversation).toHaveProperty('new');
    expect(response.conversation.new).toEqual('NEW');
  });

  it('create', async () => {
    const response = WorkflowChannelMessage.create({
      uid: 'unique',
      conversation: {
        new: 'NEW',
      },
    });

    expect(response).toHaveProperty('uid');
    expect(response.uid).toEqual('unique');
    expect(response).toHaveProperty('conversation');
    expect(response.conversation).toHaveProperty('new');
    expect(response.conversation.new).toEqual('NEW');
  });
});
