// @ts-ignore

import axios from 'axios';
import { normalizeError } from '../utils/normalizeError';
import { ExtensionHandlerEnhancer } from '../handler';

exports.S3_EXECUTION = 's3Execution';
const isS3Execution = payload => payload.meta.type === exports.S3_EXECUTION;

export const handleBigPayLoad: ExtensionHandlerEnhancer = create => () => {
  const handler = create();
  return (payload, callback) => {
    let payloadNext;
    if (isS3Execution(payload)) {
      axios
        .get(payload.body.getUrl)
        .then(response => {
          payloadNext = response.data;
        })
        .catch(err => {
          return normalizeError(err);
        });
    } else {
      payloadNext = payload.body.payload;
    }
    handler({ payload, payloadNext }, (err, result: any) => {
      let resultSend;
      if (isS3Execution(payload)) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        axios
          .post(payload.body.postUrl, {
            method: 'POST',
            headers,
            body: result,
          })
          .then(response => {
            resultSend = response.data;
          })
          .catch(error => {
            return normalizeError(error);
          });
      } else {
        resultSend = result;
      }
      callback(err, resultSend);
    });
  };
};
