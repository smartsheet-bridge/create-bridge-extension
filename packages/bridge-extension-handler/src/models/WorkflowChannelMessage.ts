import { SerializableObject } from '@smartsheet-extensions/handler';

export interface WorkflowTrigger {
  new?: string;
  existing?: string;
  entityData?: Record<string, string>;
  runtimeCTX?: SerializableObject;
}

export interface WorkflowChannelMessage {
  uid?: string;
  conversation: WorkflowTrigger;
}

export class WorkflowChannelMessage {
  /**
   * the unique identifier for the channel message.
   */
  uid?: string;

  /**
   * the conversation trigger data.
   */
  conversation: WorkflowTrigger;

  public static create({
    uid,
    conversation,
  }: Partial<WorkflowChannelMessage> = {}) {
    const response = new WorkflowChannelMessage();
    if (uid) response.setUid(uid);
    if (conversation) response.setWorkflowTrigger(conversation);
    return response;
  }

  /**
   * Sets the unique identifier for the channel message.
   * @param uid the unique identifier for the channel message.
   */
  setUid(uid: string) {
    this.uid = uid;
  }

  /**
   * Sets the workflow trigger data for the channel message.
   * @param workflow the workflow trigger data.
   */
  setWorkflowTrigger(workflow: WorkflowTrigger) {
    this.conversation = workflow;
  }

  /**
   * Set the identifier for the workflow.
   *
   * You can specific the identifier for a workflow to create a new workflow run,
   * alternatively you can give the identifier for an existing workflow run in order to restart it if paused.
   * @param workflowID the identifier for the workflow.
   * @param existing state if this is a new workflow run or an existing one.
   */
  setWorkflow(workflowID: string, existing: boolean = false) {
    this.conversation = this.conversation || {};

    if (existing) {
      this.conversation.existing = workflowID;
    } else {
      this.conversation.new = workflowID;
    }
  }

  /**
   * Sets the state values to set on the workflow run.
   * @param stateValues the state values to set.
   */
  setStateValues(stateValues: Record<string, string>) {
    this.conversation = this.conversation || {};
    this.conversation.entityData = stateValues;
  }

  /**
   * Sets runtime data that will be passed to the workflow run when it is executed.
   * @param runtimeCTX the runtime data to send to the workflow run.
   */
  setRuntimeCTX(runtimeCTX: SerializableObject) {
    this.conversation = this.conversation || {};
    this.conversation.runtimeCTX = runtimeCTX;
  }
}
