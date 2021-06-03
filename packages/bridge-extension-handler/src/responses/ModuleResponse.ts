import {
  ExtensionResponse,
  InternalError,
  isSerializableEmpty,
  isSerializableObject,
  SerializableEmpty,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

export interface ModuleResponse extends ExtensionResponse {
  value?: SerializableObject | SerializableEmpty;
  exit?: string;
}
export class ModuleResponse extends AbstractResponse {
  /**
   * The returned value of the module.
   */
  value?: SerializableObject | SerializableEmpty;

  /**
   * The string ID of the next exit path.
   */
  exit?: string;

  public static create(props: Partial<ModuleResponse> = {}) {
    return new ModuleResponse(props);
  }

  public constructor({ value, exit, status }: Partial<ModuleResponse> = {}) {
    super(status);
    this.setValue(value);
    this.setExit(exit);
  }

  /**
   * Sets the return value for the response.
   * @param value a serializable object to be returned.
   */
  public setValue(value?: SerializableObject) {
    if (!isSerializableEmpty(value) && !isSerializableObject(value)) {
      throw new InternalError(
        `\`value\` must be of type \`SerializableObject\`. Recieved \`${typeof value}\`.`
      );
    }
    this.value = value;
  }

  /**
   * Sets the exit id for the response.
   * @param exit an ID of the next exit path.
   */
  public setExit(exit?: string) {
    if (exit !== undefined && typeof exit !== 'string') {
      throw new InternalError(
        `\`exit\` must be of type \`string\`. Recieved \`${typeof exit}\`.`
      );
    }
    this.exit = exit;
  }
}
