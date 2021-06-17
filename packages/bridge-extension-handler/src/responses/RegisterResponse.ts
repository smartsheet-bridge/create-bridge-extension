import {
  ExtensionResponse,
  SerializableClass,
  SerializableObject,
  serialize,
  serializeObject,
} from '@smartsheet-extensions/handler';
import { WorkflowTriggerSpec } from '../models/WorkflowTriggerSpec';
import { AbstractResponse } from './AbstractResponse';

export interface RegisterResponse<Settings extends SerializableObject>
  extends ExtensionResponse {
  settings?: Settings;
  workflowTriggers?: WorkflowTriggerSpec[];
}
export class RegisterResponse<Settings extends SerializableObject>
  extends AbstractResponse
  implements SerializableClass {
  /**
   * the updated extension settings.
   */
  settings?: Settings;
  /**
   * specifications of any workflow triggers that could be created from external events like webhook callbacks.
   */
  workflowTriggers?: WorkflowTriggerSpec[];

  public static create<S extends SerializableObject>(
    props: Partial<RegisterResponse<S>> = {}
  ) {
    return new RegisterResponse(props);
  }

  public constructor({
    settings,
    status,
    workflowTriggers,
  }: Partial<RegisterResponse<Settings>> = {}) {
    super(status);
    this.settings = settings;
    this.workflowTriggers = workflowTriggers;
  }

  /**
   * Set updated extension settings on the response.
   * @param settings the updated extension settings.
   */
  public setSettings(settings: Settings) {
    this.settings = settings;
  }

  /**
   * Adds workflow trigger specs to the response.
   * @param triggers one or more workflow trigger specs.
   */
  public addWorkflowTriggers(...triggers: Partial<WorkflowTriggerSpec>[]) {
    if (this.workflowTriggers === undefined) {
      this.workflowTriggers = [];
    }
    triggers.forEach(trigger => {
      this.workflowTriggers.push(WorkflowTriggerSpec.create(trigger));
    });
  }

  public toSerializableObject() {
    const { status } = serializeObject(this);
    return {
      status,
      registrationData: serialize(this.settings),
      workflowTriggers: serialize(this.workflowTriggers),
    };
  }
}
