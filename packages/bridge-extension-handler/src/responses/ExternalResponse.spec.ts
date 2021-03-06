import { ExtensionStatus, serialize } from '@smartsheet-extensions/handler';
import { ChannelOutput } from '../models/ChannelOutput';
import { HttpResponse } from '../models/HttpResponse';
import { TextChannelMessage } from '../models/TextChannelMessage';
import { TriggerWorkflowChannelMessage } from '../models/TriggerWorkflowChannelMessage';
import { ExternalResponse } from './ExternalResponse';

describe('ExternalResponse', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setStatus', async () => {
    const response = new ExternalResponse();
    response.setStatus(ExtensionStatus.SUCCESS);

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('create default', async () => {
    const response = ExternalResponse.create();

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('create complex', async () => {
    const response = ExternalResponse.create({
      status: ExtensionStatus.FAIL,
      httpResponse: HttpResponse.create({
        httpStatus: 200,
      }),
    });

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.FAIL);
    expect(response).toHaveProperty('httpResponse');
    expect(response.httpResponse).toHaveProperty('httpStatus');
    expect(response.httpResponse.httpStatus).toEqual(200);
  });

  it('toSerializableObject', async () => {
    const response = ExternalResponse.create({
      status: ExtensionStatus.FAIL,
      httpResponse: HttpResponse.create({
        httpStatus: 200,
      }),
      channelOutput: [
        ChannelOutput.create({
          channelMessage: TextChannelMessage.create({ text: 'TEXT' }),
        }),
        ChannelOutput.create({
          channelMessage: TriggerWorkflowChannelMessage.create({
            workflowID: 'UUID',
          }),
        }),
      ],
    });

    const serializable = response.toSerializableObject();
    expect(serializable).toHaveProperty('status');
    expect(serializable.status).toEqual(ExtensionStatus.FAIL);
    expect(serializable).toHaveProperty('externalCallReturn');
    expect(serializable.externalCallReturn).toHaveProperty('httpStatus');
    expect((serializable.externalCallReturn as any).httpStatus).toEqual(200);
    expect(serializable).toHaveProperty('channelOutput');
    expect(serializable.channelOutput).toHaveLength(2);
    expect(serializable.channelOutput).toEqual([
      {
        channelMessage: { text: 'TEXT' },
      },
      {
        channelMessage: { conversation: { new: 'UUID' } },
      },
    ]);
  });

  it('addChannelOutput', async () => {
    const response = ExternalResponse.create();
    response.addChannelOutput({
      channelMessage: TextChannelMessage.create({ text: 'TEXT' }),
    });

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
    expect(response).toHaveProperty('channelOutput');
    expect(response.channelOutput).toHaveLength(1);
  });

  it('addChannelOutput workflow', async () => {
    const response = ExternalResponse.create();
    response.addChannelOutput({
      channelMessage: TriggerWorkflowChannelMessage.create({
        uid: 'bleh',
        workflowID: 'intent',
      }),
    });

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
    expect(response).toHaveProperty('channelOutput');
    expect(response.channelOutput).toHaveLength(1);

    const serializable = serialize(response) as any;
    expect(serializable).toHaveProperty('status');
    expect(serializable.status).toEqual(ExtensionStatus.SUCCESS);
    expect(serializable).toHaveProperty('channelOutput');
    expect(serializable.channelOutput).toHaveLength(1);
    expect(serializable.channelOutput[0]).toHaveProperty('channelMessage');
    expect(serializable.channelOutput[0].channelMessage).toHaveProperty('uid');
    expect(serializable.channelOutput[0].channelMessage.uid).toEqual('bleh');
    expect(serializable.channelOutput[0].channelMessage).toHaveProperty(
      'conversation'
    );
    expect(
      serializable.channelOutput[0].channelMessage.conversation
    ).toHaveProperty('new');
    expect(
      serializable.channelOutput[0].channelMessage.conversation.new
    ).toEqual('intent');
  });
});
