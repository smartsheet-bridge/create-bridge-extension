import { serialize } from '@smartsheet-extensions/handler';
import { BridgeChannelSettings } from './BridgeChannelSettings';
import { ChannelOutput } from './ChannelOutput';
import { ExternalChannelSettings } from './ExternalChannelSettings';
import { RestartWorkflowChannelMessage } from './RestartWorkflowChannelMessage';
import { TextChannelMessage } from './TextChannelMessage';
import { TriggerWorkflowChannelMessage } from './TriggerWorkflowChannelMessage';

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
      ExternalChannelSettings.create({
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
    expect((channelOutput.channelSetting as any).channelName).toEqual(
      'imagination'
    );
  });

  it('create', async () => {
    const channelOutput = ChannelOutput.create({
      channelMessage: TextChannelMessage.create({
        uid: 'unique',
        text: 'sample text',
      }),
      channelSetting: ExternalChannelSettings.create({
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
    expect((channelOutput.channelSetting as any).channelName).toEqual(
      'imagination'
    );
  });

  it.each([
    [
      'bridge-text',
      {
        channelMessage: TextChannelMessage.create({ text: 'input text' }),
        channelSetting: BridgeChannelSettings.create({
          userId: 'userUUID',
          threadId: 'requestUUID',
        }),
      },
      {
        channelMessage: { text: 'input text' },
        channelSetting: { userUUID: 'userUUID', requestUUID: 'requestUUID' },
      },
    ],
    [
      'external-text',
      {
        channelMessage: TextChannelMessage.create({ text: 'input text' }),
        channelSetting: ExternalChannelSettings.create({
          userId: 'USER',
          threadId: 'THREAD',
        }),
      },
      {
        channelMessage: { text: 'input text' },
        channelSetting: { userId: 'USER', threadId: 'THREAD' },
      },
    ],
    [
      'bridge-workflow-start',
      {
        channelMessage: TriggerWorkflowChannelMessage.create({
          workflowID: 'workflowID',
        }),
        channelSetting: BridgeChannelSettings.create({
          userId: 'userUUID',
          threadId: 'requestUUID',
        }),
      },
      {
        channelMessage: { conversation: { new: 'workflowID' } },
        channelSetting: { userUUID: 'userUUID', requestUUID: 'requestUUID' },
      },
    ],
    [
      'external-workflow-start',
      {
        channelMessage: TriggerWorkflowChannelMessage.create({
          workflowID: 'workflowID',
        }),
        channelSetting: ExternalChannelSettings.create({
          userId: 'USER',
          threadId: 'THREAD',
        }),
      },
      {
        channelMessage: { conversation: { new: 'workflowID' } },
        channelSetting: { userId: 'USER', threadId: 'THREAD' },
      },
    ],
    [
      'bridge-workflow-restart',
      {
        channelMessage: RestartWorkflowChannelMessage.create({
          workflowRunID: 'conversation',
        }),
        channelSetting: BridgeChannelSettings.create({
          userId: 'userUUID',
          threadId: 'requestUUID',
        }),
      },
      {
        channelMessage: { conversation: { existing: 'conversation' } },
        channelSetting: { userUUID: 'userUUID', requestUUID: 'requestUUID' },
      },
    ],
    [
      'external-workflow-restart',
      {
        channelMessage: RestartWorkflowChannelMessage.create({
          workflowRunID: 'conversation',
        }),
        channelSetting: ExternalChannelSettings.create({
          userId: 'USER',
          threadId: 'THREAD',
        }),
      },
      {
        channelMessage: { conversation: { existing: 'conversation' } },
        channelSetting: { userId: 'USER', threadId: 'THREAD' },
      },
    ],
  ] as Array<[string, Partial<ChannelOutput>, any]>)(
    'serialize %s',
    (name, input, expected) => {
      const actual = serialize(input);
      expect(actual).toEqual(expected);
    }
  );
});
