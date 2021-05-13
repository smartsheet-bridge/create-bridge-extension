export enum ExtensionStatus {
  /**
   * The function execution was a success.
   */
  SUCCESS = 0,

  /**
   * The function execution has failed.
   * */
  FAIL = 1,

  /**
   * The function execution should be retried.
   * */
  RETRY = 2,

  /**
   * Stop the current conversation flow and any parent conversations.
   * */
  STOP = 3,

  /**
   * Pause the current conversation flow, this will block the conversation until it is restarted.
   * */
  PAUSE = 4,

  /**
   * Pause the current conversation flow and start the OAuth authentication flow. The conversation will be restarted when authentication is successful.
   * */
  NEED_AUTH = 5,

  /**
   * End the current conversation flow, will allow parent conversations to continue.
   * */
  END = 6,
}

export interface ExtensionResponse {
  status: ExtensionStatus;
}
