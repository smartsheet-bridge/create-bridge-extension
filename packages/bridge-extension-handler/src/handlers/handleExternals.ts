import {
  BadRequestError,
  ExtensionFunction,
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

export const handleExternals = (config: ExternalsConfig) => (body: any) => {
  if (isExternalPayload(body)) {
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

    return config.externals[externalId](bodyData, { registrationData });
  }
};
