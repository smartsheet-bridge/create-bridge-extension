import { ChannelSettings } from './ChannelSettings';
import { MediaChannelMessage } from './MediaChannelMessage';
import { TextChannelMessage } from './TextChannelMessage';
import { WorkflowChannelMessage } from './WorkflowChannelMessage';

export type ChannelMessage =
  | TextChannelMessage
  | MediaChannelMessage
  | WorkflowChannelMessage;

export interface ChannelOutput {
  channelSetting: ChannelSettings;
  channelMessage: ChannelMessage;
}

export class ChannelOutput {
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
  setChannelMessage(channelMessage: ChannelMessage) {
    this.channelMessage = channelMessage;
  }

  /**
   * Sets the channel settings.
   * @param channelSetting the channel settings.
   */
  setChannelSetting(channelSetting: ChannelSettings) {
    this.channelSetting = channelSetting;
  }
}
