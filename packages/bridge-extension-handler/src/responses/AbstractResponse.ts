import {
  ExtensionResponse,
  ExtensionStatus,
  InternalError,
} from '@smartsheet-extensions/handler';

export abstract class AbstractResponse implements ExtensionResponse {
  /**
   * The response status.
   */
  status: ExtensionStatus = ExtensionStatus.SUCCESS;

  public constructor(status: ExtensionStatus = ExtensionStatus.SUCCESS) {
    this.setStatus(status);
  }

  /**
   * Sets the status on the response.
   * @param status the status to set.
   */
  setStatus(status: ExtensionStatus) {
    if (
      typeof status !== 'number' ||
      status < 0 ||
      status > 6 ||
      Number.isNaN(status) ||
      !Number.isFinite(status) ||
      !Number.isInteger(status)
    ) {
      throw new InternalError(
        `\`status\` must be of type \`ExtensionStatus\` or \`number\` between 0 and 6. Recieved \`${typeof status}\`.`
      );
    }
    this.status = status;
  }
}
