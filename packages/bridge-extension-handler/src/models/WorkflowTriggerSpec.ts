import {
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';

export interface WorkflowTriggerSpec {
  workflowID: string;
  stateValues?: Record<string, string>;
  triggerDetails: SerializableObject;
}

export class WorkflowTriggerSpec implements SerializableClass {
  static create(props: Partial<WorkflowTriggerSpec> = {}): WorkflowTriggerSpec {
    return new WorkflowTriggerSpec(props);
  }

  /**
   * the workflow identifier.
   */
  workflowID: string;
  /**
   * state values to be pre-set for the workflow.
   */
  stateValues?: Record<string, string>;
  /**
   * additional information about the triggering event.
   */
  triggerDetails: SerializableObject;

  public constructor({
    workflowID,
    stateValues,
    triggerDetails,
  }: Partial<WorkflowTriggerSpec> = {}) {
    if (workflowID) this.setWorkflowID(workflowID);
    if (stateValues) this.setStateValues(stateValues);
    if (triggerDetails) this.setTriggerDetails(triggerDetails);
  }

  /**
   * Sets the workflow identifier.
   * @param workflowID the workflow identifier.
   */
  public setWorkflowID(workflowID: any) {
    this.workflowID = workflowID;
  }

  /**
   * Sets any state values to be pre-set for the workflow.
   * @param stateValues pre-set state values.
   */
  public setStateValues(stateValues: any) {
    this.stateValues = stateValues;
  }

  /**
   * Sets additional information about the triggering event.
   * @param triggerDetails additional information about the triggering event.
   */
  public setTriggerDetails(triggerDetails: any) {
    this.triggerDetails = triggerDetails;
  }

  public toSerializableObject(): SerializableObject {
    return {
      intent: this.workflowID,
      entityData: this.stateValues,
      triggerDetails: this.triggerDetails,
    };
  }
}
