import {
  ExtensionResponse,
  SerializableClass,
  SerializableObject,
  serialize,
  serializeObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

export interface RegisterResponse<Settings extends SerializableObject>
  extends ExtensionResponse {
  settings?: Settings;
}
export class RegisterResponse<Settings extends SerializableObject>
  extends AbstractResponse
  implements SerializableClass {
  /**
   * The returned value of the module.
   */
  settings?: Settings;

  public static create<S extends SerializableObject>(
    props: Partial<RegisterResponse<S>> = {}
  ) {
    return new RegisterResponse(props);
  }

  public constructor({
    settings,
    status,
  }: Partial<RegisterResponse<Settings>> = {}) {
    super(status);
    this.settings = settings;
  }

  public toSerializableObject() {
    const { status } = serializeObject(this);
    return {
      status,
      registrationData: serialize(this.settings),
    };
  }
}
