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
import { OAuth2Data } from '../models/OAuth2Data';
import { ExternalResponse } from '../responses/ExternalResponse';
import { BridgeContext, BridgeFunction } from '../types';

export type ExternalFunction<
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<ExternalResponse, ExternalParams, ExternalContext<Settings>>;

export interface ExternalContext<
  Settings extends SerializableObject = SerializableObject
> extends BridgeContext<Settings> {}

export interface ExternalsConfig {
  externals?: { [externalId: string]: ExternalFunction };
}

export interface ExternalParams extends SerializableObject {
  bodyData: SerializableObject;
  formData?: Record<string, string[]>;
  inboundHeaders: Record<string, string>;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  queryParam?: Record<string, string[]>;
}

export const EXTERNAL_CALL = 'EXTERNAL_CALL';

export interface ExternalPayload {
  event: typeof EXTERNAL_CALL;
  caller: Caller;
  payload: {
    providerOAuth?: OAuth2Data;
    call: string;
    registrationData: SerializableObject;
    bodyData: SerializableObject;
    formData?: Record<string, { data: string[] }>;
    inboundHeaders: Record<string, string>;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    queryParam?: Record<string, { data: string[] }>;
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
      inboundHeaders,
      method,
      formData,
      queryParam,
      providerOAuth,
    } = body.payload;
    const { caller } = body;

    const formDataFlat: Record<string, string[]> = {};
    if (formData) {
      const keys = Object.keys(formData);
      keys.forEach(key => {
        const value = formData[key];
        formDataFlat[key] = value.data;
      });
    }

    const queryParamFlat: Record<string, string[]> = {};
    if (queryParam) {
      const keys = Object.keys(queryParam);
      keys.forEach(key => {
        const value = queryParam[key];
        queryParamFlat[key] = value.data;
      });
    }

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
      config.externals[externalId](
        {
          bodyData,
          inboundHeaders,
          method,
          formData: formDataFlat,
          queryParam: queryParamFlat,
        },
        { caller, settings, oAuthData: providerOAuth }
      ),
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
