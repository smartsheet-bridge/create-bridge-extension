import {
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';

export interface BridgeChannelSettings {
  userId: string;
  threadId?: string;
  runtimeData?: SerializableObject;
}

export class BridgeChannelSettings implements SerializableClass {
  /**
   * The unique identifier for the Bridge user.
   */
  userId: string;

  /**
   * The unique identifier for the Bridge thread.
   */
  threadId?: string;

  /**
   * Additional data that is passed to the next workflow but is not persisted.
   *
   * This is used if the extension requires unique data in order to respond or process which
   * should not, or is pointless, to persist.
   */
  runtimeData?: SerializableObject;

  public static create(props: Partial<BridgeChannelSettings> = {}) {
    return new BridgeChannelSettings(props);
  }

  public constructor({
    userId,
    threadId,
    runtimeData,
  }: Partial<BridgeChannelSettings> = {}) {
    if (userId) this.setUserID(userId);
    if (threadId) this.setThreadId(threadId);
    if (runtimeData) this.setRuntimeData(runtimeData);
  }

  /**
   * Sets the unique identifier for the Bridge user.
   * @param threadId the unique identifier for the Bridge user.
   */
  public setUserID(userId: string) {
    this.userId = userId;
  }

  /**
   * Sets the unique identifier for the Bridge thread.
   * @param threadId the unique identifier for the Bridge thread.
   */
  public setThreadId(threadId: string) {
    this.threadId = threadId;
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

  public toSerializableObject(): SerializableObject {
    return {
      runtimeCTX: this.runtimeData,
      requestUUID: this.threadId,
      userUUID: this.userId,
    };
  }
}
