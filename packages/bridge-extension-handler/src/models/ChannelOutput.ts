import {
  SerializableClass,
  SerializableObject,
  serialize,
} from '@smartsheet-extensions/handler';
import { ChannelSettings } from './ChannelSettings';
import { MediaChannelMessage } from './MediaChannelMessage';
import { RestartWorkflowChannelMessage } from './RestartWorkflowChannelMessage';
import { TextChannelMessage } from './TextChannelMessage';
import { TriggerWorkflowChannelMessage } from './TriggerWorkflowChannelMessage';

export type ChannelMessage =
  | TextChannelMessage
  | MediaChannelMessage
  | TriggerWorkflowChannelMessage
  | RestartWorkflowChannelMessage;

export interface ChannelOutput {
  channelSetting: ChannelSettings;
  channelMessage: ChannelMessage;
}

export class ChannelOutput implements SerializableClass {
  channelSetting: ChannelSettings;
  channelMessage: ChannelMessage;

  public static create(props: Partial<ChannelOutput> = {}) {
    return new ChannelOutput(props);
  }

  public constructor({
    channelSetting,
    channelMessage,
  }: Partial<ChannelOutput> = {}) {
    if (channelSetting) this.setChannelSetting(channelSetting);
    if (channelMessage) this.setChannelMessage(channelMessage);
  }

  /**
   * Sets the channel message.
   * @param channelMessage the channel message.
   */
  public setChannelMessage(channelMessage: ChannelMessage) {
    this.channelMessage = channelMessage;
  }

  /**
   * Sets the channel settings.
   * @param channelSetting the channel settings.
   */
  public setChannelSetting(channelSetting: ChannelSettings) {
    this.channelSetting = channelSetting;
  }

  public toSerializableObject(): SerializableObject {
    return {
      channelMessage: serialize(this.channelMessage),
      channelSetting: serialize(this.channelSetting),
    };
  }
}
