// @ts-ignore

import axios from 'axios';
import { normalizeError } from '../utils/normalizeError';
import { ExtensionHandlerEnhancer } from '../handler';

const S3_EXECUTION = 's3Execution';
const STREAM_EXECUTION = 'streamExecution';

const getPayloadFromS3 = async (url: string) => {
  const resp = await axios.get(url);
  return resp.data;
};

const putPayloadToS3 = async (url: string, payload: any) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const resp = await axios.post(url, {
    method: 'POST',
    headers,
    body: payload,
  });
  return resp.data;
};

type S3Execution = {
  meta: {
    type: typeof S3_EXECUTION;
  };
  body: {
    getUrl: string;
    postUrl: string;
    payload: unknown;
  };
};
type StreamExecution = {
  meta: {
    type: typeof STREAM_EXECUTION;
  };
  body: {
    getUrl: string;
    postUrl: string;
    payload: unknown;
  };
};
const isStreamExecution = (payload: any): payload is StreamExecution =>
  payload.meta.type === STREAM_EXECUTION;

const isS3Execution = (payload: any): payload is S3Execution =>
  payload.meta.type === S3_EXECUTION;

export const handleBigPayLoad: ExtensionHandlerEnhancer = create => () => {
  const handler = create();
  return async (payload, callback) => {
    if (isS3Execution(payload)) {
      const payloadFromS3 = await getPayloadFromS3(payload.body.getUrl).catch(
        err => {
          return normalizeError(err);
        }
      );
      handler(payloadFromS3, async (err, result: any) => {
        const s3Result = await putPayloadToS3(
          payload.body.postUrl,
          result
        ).catch(error => {
          return normalizeError(error);
        });
        callback(err, s3Result);
      });
    } else if (isStreamExecution(payload)) {
      handler(payload.body, (err, result: any) => {
        callback(err, result);
      });
    }
  };
};
