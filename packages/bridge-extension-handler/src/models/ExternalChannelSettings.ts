import {
  SerializableClass,
  SerializableObject,
  serialize,
} from '@smartsheet-extensions/handler';
import { ChannelUserInfo } from './ChannelUserInfo';
import { OAuth2Data } from './OAuth2Data';

export interface ExternalChannelSettings {
  userId: string;
  threadId: string;
  data?: SerializableObject;
  runtimeData?: SerializableObject;
  channelName?: string;
  userInfo?: ChannelUserInfo;
  sync?: boolean;
  isGroup?: boolean;
}

/**
 * Parse the classic bridge payload into a more manageable format.
 * @param payload the classic bridge payload
 * @returns external channel settings.
 */
export function parseExternalChannelSettingsPayload(
  payload: any,
  invokerOAuth: OAuth2Data
): ExternalChannelSettings {
  if (payload === undefined || payload == null) {
    return undefined;
  }

  const settings = new ExternalChannelSettings();
  settings.setChannelName(payload.channelName || undefined);
  settings.setData(payload.data || undefined);
  settings.setIsGroup(payload.isGroup || false);
  settings.setIsSync(payload.sync || false);
  settings.setRuntimeData(payload.runtimeCtx || undefined);
  settings.setThreadId(payload.threadId || payload.requestUUID || '');
  settings.setUserID(payload.userId || payload.userUUID || '');
  settings.setUserInfo(payload.userInfo || undefined);
  settings.oAuthData = invokerOAuth;

  return settings;
}

export class ExternalChannelSettings implements SerializableClass {
  /**
   * The unique identifier for user in channel.
   */
  userId: string;
  /**
   * The unique identifier for the thread in the channel.
   */
  threadId: string;

  /**
   * Additional data stored against the user.
   */
  data?: SerializableObject;
  /**
   * Additional data that is passed to the next workflow but is not persisted.
   *
   * This is used if the extension requires unique data in order to respond or process which
   * should not, or is pointless, to persist.
   */
  runtimeData?: SerializableObject;
  /**
   * The name of the notification or chat channel.
   */
  channelName?: string;
  /**
   * An object that describes the user.
   */
  userInfo?: ChannelUserInfo;
  /**
   * States if the channel should be invoked synchronously.
   */
  sync?: boolean;
  /**
   * States if this describes a group thread.
   *
   * In a group thread it is possible for multiple users to interact with a single workflow,
   * for example to complete a poll or survey.
   */
  isGroup?: boolean;

  /**
   * The OAuth data linked to this channel settings user.
   *
   * These tokens are only generated for chat channels that implement the invoker OAuth flow.
   */
  oAuthData?: OAuth2Data;

  public static create(props: Partial<ExternalChannelSettings> = {}) {
    return new ExternalChannelSettings(props);
  }

  public constructor({
    userId,
    threadId,
    data,
    runtimeData,
    channelName,
    userInfo,
    sync,
    isGroup,
  }: Partial<ExternalChannelSettings> = {}) {
    if (userId) this.setUserID(userId);
    if (threadId) this.setThreadId(threadId);
    if (data) this.setData(data);
    if (runtimeData) this.setRuntimeData(runtimeData);
    if (channelName) this.setChannelName(channelName);
    if (userInfo) this.setUserInfo(userInfo);
    if (sync) this.setIsSync(sync);
    if (isGroup) this.setIsGroup(isGroup);
  }

  /**
   * Sets the channel user identifier.
   * @param userId channel user identifier.
   */
  public setUserID(userId: string) {
    this.userId = userId;
  }

  /**
   * Sets the channel thread identifier.
   * @param threadId channel thread identifier.
   */
  public setThreadId(threadId: string) {
    this.threadId = threadId;
  }

  /**
   * Sets the user data.
   * @param data user data.
   */
  public setData(data: SerializableObject) {
    this.data = data;
  }

  /**
   * Sets the user runtime data.
   *
   * Additional data that is passed to the next workflow but is not persisted.
   * @param runtimeData user runtime data.
   */
  public setRuntimeData(runtimeData: SerializableObject) {
    this.runtimeData = runtimeData;
  }

  /**
   * Sets the channel name.
   * @param channelName channel name.
   */
  public setChannelName(channelName: string) {
    this.channelName = channelName;
  }

  /**
   * Sets the channel user information.
   * @param userInfo user information.
   */
  public setUserInfo(userInfo: ChannelUserInfo) {
    this.userInfo = userInfo;
  }

  /**
   * Sets if the channel should be invoked synchronously.
   * @param isSync if the channel is synchronous.
   */
  public setIsSync(isSync: boolean) {
    this.sync = isSync;
  }

  /**
   * Sets if the channel thread is a group thread.
   * @param isGroup if the channel thread is a group thread.
   */
  public setIsGroup(isGroup: boolean) {
    this.isGroup = isGroup;
  }

  public toSerializableObject(): SerializableObject {
    return {
      channelName: this.channelName,
      data: this.data,
      isGroup: this.isGroup,
      runtimeCTX: this.runtimeData,
      sync: this.sync,
      threadId: this.threadId,
      userId: this.userId,
      userInfo: serialize(this.userInfo),
    };
  }
}
