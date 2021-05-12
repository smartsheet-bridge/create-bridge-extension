import {
  BadRequestError,
  ExtensionFunction,
  ExtensionHandlerEnhancer,
  NotFoundError,
} from '@smartsheet-extensions/handler';

export interface ExternalsConfig {
  externals?: { [externalId: string]: ExtensionFunction };
}

export const EXTERNAL_CALL = 'EXTERNAL_CALL';

export interface ExternalPayload {
  event: typeof EXTERNAL_CALL;
  payload: {
    call: string;
    method: 'POST' | 'GET';
    registrationData: object;
    inboundHeaders: { [key: string]: string };
    bodyData: object;
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

    const { call: externalId, bodyData, registrationData } = body.payload;

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
      config.externals[externalId](bodyData, { registrationData }),
      callback
    );
  };
};
