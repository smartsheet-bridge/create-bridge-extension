import {
  ExtensionResponse,
  SerializableClass,
  serializeObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

export interface UnregisterResponse extends ExtensionResponse {}
export class UnregisterResponse
  extends AbstractResponse
  implements SerializableClass {
  public static create(props: Partial<UnregisterResponse> = {}) {
    return new UnregisterResponse(props);
  }

  public constructor({ status }: Partial<UnregisterResponse> = {}) {
    super(status);
  }

  public toSerializableObject() {
    const { status } = serializeObject(this);
    return {
      status,
    };
  }
}
