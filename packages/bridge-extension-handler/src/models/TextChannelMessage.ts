export interface TextChannelMessage {
  uid?: string;
  text: string;
}

export class TextChannelMessage {
  /**
   * the unique identifier for the channel message.
   */
  uid?: string;
  /**
   * the text of the channel message.
   */
  text: string;

  public static create(props: Partial<TextChannelMessage> = {}) {
    return new TextChannelMessage(props);
  }

  public constructor({ uid, text }: Partial<TextChannelMessage> = {}) {
    if (uid) this.setUid(uid);
    if (text) this.setText(text);
  }

  /**
   * Sets the unique identifier for the channel message.
   * @param uid the unique identifier for the channel message.
   */
  setUid(uid: string) {
    this.uid = uid;
  }

  /**
   * Sets the text for the channel message.
   * @param text the text for the channel message.
   */
  setText(text: string) {
    this.text = text;
  }
}
