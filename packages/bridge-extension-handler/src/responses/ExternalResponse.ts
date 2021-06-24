import {
  ExtensionResponse,
  SerializableClass,
  SerializableObject,
  serialize,
} from '@smartsheet-extensions/handler';
import { ChannelOutput } from '../models/ChannelOutput';
import { HttpResponse } from '../models/HttpResponse';
import { AbstractResponse } from './AbstractResponse';

export interface ExternalResponse extends ExtensionResponse {
  channelOutput: ChannelOutput[];
  httpResponse: HttpResponse;
}

export class ExternalResponse
  extends AbstractResponse
  implements SerializableClass {
  /**
   * The HTTP Response data to the originating HTTP request.
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
  public setHTTPResponse(
    httpResponse: Pick<HttpResponse, 'body' | 'headers' | 'httpStatus'>
  ) {
    this.httpResponse = HttpResponse.create(httpResponse);
  }

  /**
   * Sets the channel output for the response.
   * @param channelOutput An array of channel output definitions.
   */
  public setChannelOutput(channelOutput: ChannelOutput[]) {
    this.channelOutput = channelOutput;
  }

  /**
   * Adds one or more channel outputs to the response.
   * @param channelOutput One or more channel output definitions.
   */
  public addChannelOutput(...channelOutput: Partial<ChannelOutput>[]) {
    if (this.channelOutput === undefined) {
      this.channelOutput = [];
    }
    channelOutput.forEach(output => {
      this.channelOutput.push(ChannelOutput.create(output));
    });
  }

  public toSerializableObject(): SerializableObject {
    return {
      status: this.status,
      channelOutput: serialize(this.channelOutput),
      externalCallReturn: serialize(this.httpResponse),
    };
  }
}
