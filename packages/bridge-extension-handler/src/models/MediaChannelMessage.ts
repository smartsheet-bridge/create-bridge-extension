import { SerializableObject } from '@smartsheet-extensions/handler';

export interface RichMedia {
  type?: string;
  entity?: SerializableObject;
}

export interface MediaChannelMessage {
  uid?: string;
  media: RichMedia;
}

export class MediaChannelMessage {
  /**
   * the unique identifier for the channel message.
   */
  uid?: string;

  /**
   * the rich media component.
   */
  media: RichMedia;

  public static create(props: Partial<MediaChannelMessage> = {}) {
    return new MediaChannelMessage(props);
  }

  public constructor({ uid, media }: Partial<MediaChannelMessage> = {}) {
    if (uid) this.setUid(uid);
    if (media) this.setMedia(media);
  }

  /**
   * Sets the unique identifier for the channel message.
   * @param uid the unique identifier for the channel message.
   */
  setUid(uid: string) {
    this.uid = uid;
  }

  /**
   * Sets the rich media component of the channel message.
   * @param media rich media component.
   */
  setMedia(media: RichMedia) {
    this.media = media;
  }

  /**
   * Sets the rich media entity type.
   * @param type the rich media entity type.
   */
  setType(type: string) {
    this.media = this.media || {};
    this.media.type = type;
  }

  /**
   * Sets the rich media entity data.
   * @param data the rich media entity data.
   */
  setData(data: SerializableObject) {
    this.media = this.media || {};
    this.media.entity = data;
  }
}
