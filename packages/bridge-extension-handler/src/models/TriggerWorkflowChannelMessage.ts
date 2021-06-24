import {
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';

export interface TriggerWorkflowChannelMessage {
  uid?: string;
  workflowID: string;
  stateValues?: Record<string, string>;
  runtimeData?: SerializableObject;
}

export class TriggerWorkflowChannelMessage implements SerializableClass {
  /**
   * the unique identifier for the channel message.
   */
  uid?: string;

  /**
   * the identifier for the workflow to trigger.
   */
  workflowID: string;

  /**
   * the state values to set on the workflow run.
   */
  stateValues?: Record<string, string>;

  /**
   * the runtime data to send to the workflow run.
   */
  runtimeData?: SerializableObject;

  public static create(props: Partial<TriggerWorkflowChannelMessage> = {}) {
    return new TriggerWorkflowChannelMessage(props);
  }

  public constructor({
    uid,
    workflowID,
    stateValues,
    runtimeData,
  }: Partial<TriggerWorkflowChannelMessage> = {}) {
    if (uid) this.uid = uid;
    if (workflowID) this.workflowID = workflowID;
    if (stateValues) this.stateValues = stateValues;
    if (runtimeData) this.runtimeData = runtimeData;
  }

  /**
   * Sets the unique identifier for the channel message.
   * @param uid the unique identifier for the channel message.
   */
  public setUid(uid: string) {
    this.uid = uid;
  }

  /**
   * Set the identifier for the workflow to trigger.
   * @param workflowID the identifier for the workflow.
   */
  public setWorkflowId(workflowID: string) {
    this.workflowID = workflowID;
  }

  /**
   * Sets the state values to set on the workflow run.
   * @param stateValues the state values to set.
   */
  public setStateValues(stateValues: Record<string, string>) {
    this.stateValues = stateValues;
  }

  /**
   * Sets runtime data that will be passed to the workflow run when it is executed.
   * @param runtimeData the runtime data to send to the workflow run.
   */
  public setRuntimeData(runtimeData: SerializableObject) {
    this.runtimeData = runtimeData;
  }

  public toSerializableObject(): SerializableObject {
    return {
      uid: this.uid,
      conversation: {
        new: this.workflowID,
        entityData: this.stateValues,
        runtimeCTX: this.runtimeData,
      },
    };
  }
}
