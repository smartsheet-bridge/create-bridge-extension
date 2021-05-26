import {
  ExtensionResponse,
  SerializableEmpty,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

export interface ModuleResponse extends ExtensionResponse {
  value: SerializableObject | SerializableEmpty;
  exit: string;
}
export class ModuleResponse extends AbstractResponse {
  /**
   * The returned value of the module.
   */
  value: SerializableObject | SerializableEmpty;

  /**
   * The string ID of the next exit path.
   */
  exit: string;

  public static create({ value, exit, status }: Partial<ModuleResponse> = {}) {
    const response = new ModuleResponse();
    if (value) response.setValue(value);
    if (exit) response.setExit(exit);
    if (status) response.setStatus(status);
    return response;
  }

  /**
   * Sets the return value for the response.
   * @param value a serializable object to be returned.
   */
  public setValue(value: SerializableObject) {
    this.value = value;
  }

  /**
   * Sets the exit id for the response.
   * @param exit an ID of the next exit path.
   */
  public setExit(exitId: string) {
    this.exit = exitId;
  }
}
