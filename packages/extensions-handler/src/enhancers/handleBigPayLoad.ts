// @ts-ignore

import axios from 'axios';
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
const isStreamExecution = (payload: any): payload is StreamExecution => {
  if (payload.meta !== undefined && payload.meta.type !== undefined) {
    return payload.meta.type === STREAM_EXECUTION;
  }
};

const isS3Execution = (payload: any): payload is S3Execution => {
  if (payload.meta !== undefined && payload.meta.type !== undefined) {
    return payload.meta.type === S3_EXECUTION;
  }
};
export const handleBigPayLoad: ExtensionHandlerEnhancer = create => {
  return () => {
    const handler = create();
    return async (payload, callback) => {
      let payloadNext;
      if (isS3Execution(payload)) {
        payloadNext = await getPayloadFromS3(payload.body.getUrl);
      } else if (isStreamExecution(payload)) {
        payloadNext = payload.body.payload;
      } else {
        payloadNext = payload;
      }
      handler(payloadNext, (err, result: any) => {
        if (isStreamExecution(payload)) {
          callback(err, result);
        } else if (isS3Execution(payload)) {
          putPayloadToS3(payload.body.postUrl, result)
            .then(resultNext => callback(err, resultNext))
            .catch(callback);
        } else {
          callback(err, result);
        }
      });
    };
  };
};
