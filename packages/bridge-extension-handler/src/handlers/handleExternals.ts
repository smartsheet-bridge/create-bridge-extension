import {
  BadRequestError,
  ExtensionHandlerEnhancer,
  NotFoundError,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { Caller } from '../models/Caller';
import { ExternalResponse } from '../responses/ExternalResponse';
import { BridgeFunction } from '../types';

// TODO: Change AbstractResponse to ExternalResponse once built.
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
      callback
    );
  };
};
