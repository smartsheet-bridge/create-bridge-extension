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
  suspendTime?: number;
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

  /**
   * The number of seconds the workflow run should pause
   * before either retrying the module or continuing the workflow run
   */
  suspendTime?: number;

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
        `\`value\` must be of type \`SerializableObject\`. Received \`${typeof value}\`.`
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
        `\`exit\` must be of type \`string\`. Received \`${typeof exit}\`.`
      );
    }
    this.exit = exit;
  }

  /**
   * Sets the number of seconds that the workflow should be paused.
   * @param suspendTime a positive number of whole seconds to suspend the workflow.
   */
  public setSuspendTime(suspendTime?: number) {
    if (suspendTime !== undefined && typeof suspendTime !== 'number') {
      throw new InternalError(
        `\`suspendTime\` must be of type \`number\`. Received \`${typeof suspendTime}\`.`
      );
    }
    this.suspendTime = suspendTime;
  }
}
