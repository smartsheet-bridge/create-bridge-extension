import {
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';

export interface MediaChannelMessage {
  uid?: string;
  type?: string;
  data: SerializableObject;
}

export class MediaChannelMessage implements SerializableClass {
  /**
   * the unique identifier for the channel message.
   */
  uid?: string;

  /**
   * the type of rich media.
   */
  type?: string;

  /**
   * the rich media data.
   */
  data: SerializableObject;

  public static create(props: Partial<MediaChannelMessage> = {}) {
    return new MediaChannelMessage(props);
  }

  public constructor({ uid, type, data }: Partial<MediaChannelMessage> = {}) {
    if (uid) this.setUid(uid);
    if (type) this.setType(type);
    if (data) this.setData(data);
  }

  /**
   * Sets the unique identifier for the channel message.
   * @param uid the unique identifier for the channel message.
   */
  public setUid(uid: string) {
    this.uid = uid;
  }

  /**
   * Sets the rich media entity type.
   * @param type the rich media entity type.
   */
  public setType(type: string) {
    this.type = type;
  }

  /**
   * Sets the rich media entity data.
   * @param data the rich media entity data.
   */
  public setData(data: SerializableObject) {
    this.data = data;
  }

  public toSerializableObject(): SerializableObject {
    return {
      uid: this.uid,
      media: {
        type: this.type,
        entity: this.data,
      },
    };
  }
}
