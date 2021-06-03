import { SerializableObject } from '@smartsheet-extensions/handler';
import { ChannelUserInfo } from './ChannelUserInfo';

export interface ChannelSettings {
  userId?: string;
  threadId?: string;
  userUUID?: string;
  requestUUID?: string;
  data?: SerializableObject;
  runtimeCTX?: SerializableObject;
  channelName?: string;
  userInfo?: ChannelUserInfo;
  sync?: boolean;
  isGroup?: boolean;
}

export class ChannelSettings {
  /**
   * The unique identifier for user in channel.
   */
  userId?: string;
  /**
   * The unique identifier for the thread in the channel.
   */
  threadId?: string;
  /**
   * The bridge identifier for the user.
   */
  userUUID?: string;
  /**
   * The bridge identifier for the thread.
   */
  requestUUID?: string;
  /**
   * Additional data stored against the user.
   */
  data?: SerializableObject;
  /**
   * Additional data that is passed to the next workflow but is not persisted.
   */
  runtimeCTX?: SerializableObject;
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

  public static create(props: Partial<ChannelSettings> = {}) {
    return new ChannelSettings(props);
  }

  public constructor({
    userId,
    threadId,
    userUUID,
    requestUUID,
    data,
    runtimeCTX,
    channelName,
    userInfo,
    sync,
    isGroup,
  }: Partial<ChannelSettings> = {}) {
    if (userId) this.setUserID(userId);
    if (threadId) this.setThreadId(threadId);
    if (userUUID) this.setUserUUID(userUUID);
    if (requestUUID) this.setRequestUUID(requestUUID);
    if (data) this.setData(data);
    if (runtimeCTX) this.setRuntimeCTX(runtimeCTX);
    if (channelName) this.setChannelName(channelName);
    if (userInfo) this.setUserInfo(userInfo);
    if (sync) this.setIsSync(sync);
    if (isGroup) this.setIsGroup(isGroup);
  }

  /**
   * Sets the channel user identifier.
   * @param userId channel user identifier.
   */
  setUserID(userId: string) {
    this.userId = userId;
  }

  /**
   * Sets the channel thread identifier.
   * @param threadId channel thread identifier.
   */
  setThreadId(threadId: string) {
    this.threadId = threadId;
  }

  /**
   * Sets the bridge user UUID.
   * @param userUUID bridge user UUID.
   */
  setUserUUID(userUUID: string) {
    this.userUUID = userUUID;
  }

  /**
   * Sets the bridge thread UUID.
   * @param requestUUID bridge thread UUID.
   */
  setRequestUUID(requestUUID: string) {
    this.requestUUID = requestUUID;
  }

  /**
   * Sets the user data.
   * @param data user data.
   */
  setData(data: SerializableObject) {
    this.data = data;
  }

  /**
   * Sets the user runtime data.
   * @param runtimeCTX user runtime data.
   */
  setRuntimeCTX(runtimeCTX: SerializableObject) {
    this.runtimeCTX = runtimeCTX;
  }

  /**
   * Sets the channel name.
   * @param channelName channel name.
   */
  setChannelName(channelName: string) {
    this.channelName = channelName;
  }

  /**
   * Sets the channel user information.
   * @param userInfo user information.
   */
  setUserInfo(userInfo: ChannelUserInfo) {
    this.userInfo = userInfo;
  }

  /**
   * Sets if the channel should be invoked synchronously.
   * @param isSync if the channel is synchronous.
   */
  setIsSync(isSync: boolean) {
    this.sync = isSync;
  }

  /**
   * Sets if the channel thread is a group thread.
   * @param isGroup if the channel thread is a group thread.
   */
  setIsGroup(isGroup: boolean) {
    this.isGroup = isGroup;
  }
}
