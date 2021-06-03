import { ExtensionResponse } from '@smartsheet-extensions/handler';
import { ChannelOutput } from '../models/ChannelOutput';
import { HttpResponse } from '../models/HttpResponse';
import { AbstractResponse } from './AbstractResponse';

export interface ExternalResponse extends ExtensionResponse {
  channelOutput: ChannelOutput[];
  httpResponse: HttpResponse;
}

export class ExternalResponse extends AbstractResponse {
  /**
   * The HTTP Response data.
   */
  httpResponse: HttpResponse;

  /**
   * The channel output for the response.
   */
  channelOutput: ChannelOutput[];

  public static create(props: Partial<ExternalResponse> = {}) {
    return new ExternalResponse(props);
  }

  public constructor({
    httpResponse,
    channelOutput,
    status,
  }: Partial<ExternalResponse> = {}) {
    super(status);
    if (httpResponse) this.setHTTPResponse(httpResponse);
    if (channelOutput) this.setChannelOutput(channelOutput);
  }

  /**
   * Sets the HTTP response data for the challenge response.
   * @param httpResponse the HTTP response data.
   */
  setHTTPResponse(httpResponse: HttpResponse) {
    this.httpResponse = httpResponse;
  }

  /**
   * Sets the channel output for the response.
   * @param channelOutput An array of channel output definitions.
   */
  setChannelOutput(channelOutput: ChannelOutput[]) {
    this.channelOutput = channelOutput;
  }

  /**
   * Adds one or more channel outputs to the response.
   * @param channelOutput One or more channel output definitions.
   */
  addChannelOutput(...channelOutput: ChannelOutput[]) {
    if (this.channelOutput === undefined) {
      this.channelOutput = [];
    }
    this.channelOutput.push(...channelOutput);
  }
}
