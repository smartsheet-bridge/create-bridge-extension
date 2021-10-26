import { getWorkflowRunFromPayloadObject, WorkflowRun } from './WorkflowRun';

describe('model tests - WorkflowRun', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const tests = [
    [
      undefined,
      {
        currentState: '',
        states: {},
        threadId: '',
        workflowRunId: '',
        workspaceId: '',
      },
    ],
    [
      null,
      {
        currentState: '',
        states: {},
        threadId: '',
        workflowRunId: '',
        workspaceId: '',
      },
    ],
    [
      {
        currentState: 'HERE',
        conversationUUID: 'CONV',
        requestUUID: 'REQUEST',
        workspace: 'WORK',
        states: {
          WHEN: '?',
          WHY: '?',
          WHO: '?',
        },
      },
      {
        currentState: 'HERE',
        states: {
          WHEN: '?',
          WHY: '?',
          WHO: '?',
        },
        threadId: 'REQUEST',
        workflowRunId: 'CONV',
        workspaceId: 'WORK',
      },
    ],
  ] as Array<[any, WorkflowRun]>;

  it.each(tests)('accepts given %s, returns %s', (given, expected) => {
    const actual = getWorkflowRunFromPayloadObject(given);
    expect(actual).toEqual(expected);
  });
});
