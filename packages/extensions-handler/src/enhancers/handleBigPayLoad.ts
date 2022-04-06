// @ts-ignore

import axios from 'axios';
import { normalizeError } from '../utils/normalizeError';
import { ExtensionHandlerEnhancer } from '../handler';

const S3_EXECUTION = 's3Execution';
const STREAM_EXECUTION = 'streamExecution';

const getPayloadFromS3 = async (url: string) => {
  const resp = await axios.get(url);
  return resp.data(); // (Or whatever)
};

const putPayloadToS3 = async (url: string, payload: any) => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const resp = await axios.post(url, {
    method: 'POST',
    headers,
    body: payload,
  });
  return resp.data(); // (Or whatever)
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
  return (payload, callback) => {
    if (isS3Execution(payload)) {
      getPayloadFromS3(payload.body.getUrl)
        .then(payloadFronmS3 => {
          handler(payloadFronmS3, (err, result: any) => {
            putPayloadToS3(payload.body.postUrl, result)
              .then(s3Result => {
                callback(err, s3Result);
              })
              .catch(error => {
                return normalizeError(error);
              });
          });
        })
        .catch(err => {
          return normalizeError(err);
        });
    } else if (isStreamExecution(payload)) {
      handler(payload, (err, result: any) => {
        callback(err, result);
      });
    }
  };
};
