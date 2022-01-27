import { Handler } from 'aws-lambda';
import { InternalError } from '../errors/InternalError';
import { ExtensionHandlerEnhancer } from '../handler';
import { normalizeError } from '../utils/normalizeError';

export type ExtensionLambdaHandler = Handler<ExtensionEvent, ExtensionResult>;
export type ExtensionEvent = any;
export type ExtensionResult = any;

/**
 * This enhancer will return a function that takes a `event` and a `Context`
 * and passes the `body` parameter from the request through to the handler (or
 * next enhancer).
 *
 * **Note**: Should always be the first enhancer given and shouldn't be used with any other transport enhancers.
 */
export const lambdaTransport: ExtensionHandlerEnhancer<ExtensionLambdaHandler> = create => () => {
  const handler = create();
  return (event, context, callback) => {
    const normalizeErrorAndRespond = (e: any) => {
      const error = normalizeError(e);
      if (callback) {
        callback(null, error.toJSON());
      }
    };

    try {
      if (event === undefined) {
        throw new InternalError('Lambda event can not be undefined.');
      }

      if (context === undefined) {
        throw new InternalError('Lambda context can not be undefined.');
      }

      handler(event, (err, result) => {
        if (err) {
          normalizeErrorAndRespond(err);
        } else {
          callback(null, result);
        }
      });
    } catch (err) {
      normalizeErrorAndRespond(err);
    }
  };
};
