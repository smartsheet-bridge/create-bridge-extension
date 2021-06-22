export interface WorkflowRun {
  workflowRunId: string;
  threadId: string;
  workspaceId: string;
  currentState: string;
  states: Record<string, string>;
}

export function getWorkflowRunFromPayloadObject(payload: any): WorkflowRun {
  return {
    currentState: (payload && payload.currentState) || '',
    states: (payload && payload.states) || {},
    threadId: (payload && payload.requestUUID) || '',
    workflowRunId: (payload && payload.conversationUUID) || '',
    workspaceId: (payload && payload.workspace) || '',
  };
}
