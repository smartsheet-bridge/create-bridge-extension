import type { Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalError } from '../errors/InternalError';
import { ExtensionHandlerEnhancer } from '../handler';
import { normalizeError } from '../utils/normalizeError';

type ExtensionHTTPHandler = (request: Request, response: Response) => void;

/**
 * This enhancer will return a function that takes a `Request` and a `Response`
 * and passes the `body` parameter from the request through to the handler (or
 * next enhancer). Any response from the handler is converted to json and returned
 * on the response with a `200` status.
 *
 * **Note**: Should always be the first enhancer given and shouldn't be used with any other transport enhancers.
 */
export const httpTransport: ExtensionHandlerEnhancer<ExtensionHTTPHandler> = create => () => {
  const handler = create();
  return (request: Request, response: Response) => {
    try {
      if (request === undefined) {
        throw new InternalError('HTTP Request can not be undefined.');
      }

      if (response === undefined) {
        throw new InternalError('HTTP Response can not be undefined.');
      }

      const { body } = request;

      if (body === undefined) {
        throw new BadRequestError('HTTP Request must contain `body` property.');
      }

      handler(body, (result: unknown) => {
        response.status(200).json(result);
      });
    } catch (e) {
      const error = normalizeError(e);
      // Disabling eslint warning here because the expected behavior is to print the error.
      // eslint-disable-next-line no-console
      console.error(error);
      if (response) {
        response.status(200).json(error.toJSON());
      }
      if (!process.env.SILENCE) {
        throw e;
      }
    }
  };
};
