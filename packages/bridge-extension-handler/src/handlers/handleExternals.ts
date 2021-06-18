import {
  BadRequestError,
  ExtensionHandlerEnhancer,
  isSerializableObject,
  NotFoundError,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { BadExternalResponseError } from '../errors/BadExternalResponseError';
import { Caller } from '../models/Caller';
import { ChannelOutput } from '../models/ChannelOutput';
import { HttpResponse } from '../models/HttpResponse';
import { ExternalResponse } from '../responses/ExternalResponse';
import { BridgeFunction } from '../types';

export type ExternalFunction<
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<ExternalResponse, Params, Settings>;
export interface ExternalsConfig {
  externals?: { [externalId: string]: ExternalFunction };
}

export const EXTERNAL_CALL = 'EXTERNAL_CALL';

export interface ExternalPayload {
  event: typeof EXTERNAL_CALL;
  caller: Caller;
  payload: {
    call: string;
    method: 'POST' | 'GET';
    registrationData: SerializableObject;
    inboundHeaders: { [key: string]: string };
    bodyData: SerializableObject;
  };
}

const isExternalPayload = (payload: any): payload is ExternalPayload =>
  payload.event === EXTERNAL_CALL;

function isHTTPResponse(value: any): boolean {
  return (
    value instanceof HttpResponse ||
    (isSerializableObject(value) && value.httpStatus !== undefined)
  );
}

function isChannelOutput(value: any): boolean {
  return (
    value instanceof ChannelOutput ||
    (isSerializableObject(value) &&
      value.channelMessage !== undefined &&
      value.channelSetting !== undefined)
  );
}

function isArrayOfChannelOutput(value: any): boolean {
  return Array.isArray(value) && value.every(item => isChannelOutput(item));
}

export const handleExternals = (
  config: ExternalsConfig
): ExtensionHandlerEnhancer => create => () => {
  const next = create();
  return (body, callback) => {
    if (!isExternalPayload(body)) {
      throw new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      );
    }

    const {
      call: externalId,
      bodyData,
      registrationData: settings = {},
    } = body.payload;
    const { caller } = body;

    if (externalId === undefined) {
      throw new BadRequestError(
        'Payload must contain property `call` to execute an external function.'
      );
    }

    if (
      config === undefined ||
      config.externals === undefined ||
      config.externals[externalId] === undefined
    ) {
      throw new NotFoundError(
        `External function \`${externalId}\` does not exist.`
      );
    }

    next(
      config.externals[externalId](bodyData, { caller, settings }),
      (err?: Error, result?: unknown) => {
        if (err) {
          callback(err);
        } else if (result instanceof ExternalResponse) {
          callback(err, result);
        } else if (isHTTPResponse(result)) {
          callback(
            err,
            ExternalResponse.create({
              httpResponse: HttpResponse.create(result),
            })
          );
        } else if (isChannelOutput(result)) {
          callback(
            err,
            ExternalResponse.create({
              channelOutput: [ChannelOutput.create(result)],
            })
          );
        } else if (isArrayOfChannelOutput(result)) {
          callback(
            err,
            ExternalResponse.create({
              channelOutput: result as ChannelOutput[],
            })
          );
        } else if (result === null) {
          throw new BadExternalResponseError(externalId, 'null');
        } else {
          throw new BadExternalResponseError(externalId, typeof result);
        }
      }
    );
  };
};
