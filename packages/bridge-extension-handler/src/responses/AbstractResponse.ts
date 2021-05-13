import {
  ExtensionResponse,
  ExtensionStatus,
} from '@smartsheet-extensions/handler';

export class AbstractResponse implements ExtensionResponse {
  /**
   * The response status.
   */
  status: ExtensionStatus = ExtensionStatus.SUCCESS;

  /**
   * Sets the status on the response.
   * @param status the status to set.
   */
  setStatus(status: ExtensionStatus) {
    this.status = status;
  }
}
