import {
  SerializableClass,
  SerializableObject,
} from '@smartsheet-extensions/handler';

export interface RestartWorkflowChannelMessage {
  uid?: string;
  workflowRunID?: string;
  stateValues?: Record<string, string>;
  runtimeData?: SerializableObject;
}

export class RestartWorkflowChannelMessage implements SerializableClass {
  /**
   * the unique identifier for the channel message.
   */
  uid?: string;

  /**
   * the unique identifier of workflow run to restart
   */
  workflowRunID?: string;

  /**
   * the state values to set on the workflow run.
   */
  stateValues?: Record<string, string>;

  /**
   * the runtime data to send to the workflow run.
   */
  runtimeData?: SerializableObject;

  public static create(props: Partial<RestartWorkflowChannelMessage> = {}) {
    return new RestartWorkflowChannelMessage(props);
  }

  public constructor({
    uid,
    workflowRunID,
    stateValues,
    runtimeData,
  }: Partial<RestartWorkflowChannelMessage> = {}) {
    if (uid) this.setUid(uid);
    if (workflowRunID) this.workflowRunID = workflowRunID;
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
   * Set the identifier for the workflow run to restart.
   * @param workflowRunID the identifier for the workflow run.
   */
  public setWorkflowRunId(workflowRunID: string) {
    this.workflowRunID = workflowRunID;
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
    // kinda pointless with this class but each ChannelMessage needs to implement this interface
    return {
      uid: this.uid,
      conversation: {
        existing: this.workflowRunID,
        entityData: this.stateValues,
        runtimeCTX: this.runtimeData,
      },
    };
  }
}
