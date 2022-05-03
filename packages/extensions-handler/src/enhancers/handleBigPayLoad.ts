// @ts-ignore

import axios from 'axios';
import FormData from 'form-data';
import { ExtensionHandlerEnhancer } from '../handler';

const S3_EXECUTION = 's3Execution';
const STREAM_EXECUTION = 'streamExecution';

const getPayloadFromS3 = async (url: string) => {
  const resp = await axios.get(url);
  return resp.data;
};

const putPayloadToS3 = async (url: string, payload: any) => {
  const urlObj = new URL(decodeURI(url));
  const formData = new FormData();
  const urlVal = urlObj.origin + urlObj.pathname;
  urlObj.searchParams.forEach(function (value, key) {
    formData.append(key, value);
  });
  formData.append('file', JSON.stringify(payload));
  const resp = await axios.post(urlVal, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-Length': formData.getLengthSync(),
    },
  });
  return resp.data;
};

type S3Execution = {
  meta: {
    type: typeof S3_EXECUTION;
  };
  body: {
    getURL: string;
    postURL: string;
    payload: unknown;
  };
};
type StreamExecution = {
  meta: {
    type: typeof STREAM_EXECUTION;
  };
  body: {
    getURL: string;
    postURL: string;
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
    return (payload, callback) => {
      if (isS3Execution(payload)) {
        getPayloadFromS3(payload.body.getURL)
          .then(resultFromS3 => {
            handler(resultFromS3, (err, result: any) => {
              putPayloadToS3(payload.body.postURL, result)
                .then(resultNext => callback(err, resultNext))
                .catch(callback);
            });
          })
          .catch(callback);
      } else if (isStreamExecution(payload)) {
        handler(payload.body.payload, callback);
      } else {
        handler(payload, callback);
      }
    };
  };
};
