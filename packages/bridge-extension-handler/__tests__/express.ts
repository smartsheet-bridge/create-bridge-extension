import { ExtensionLambdaHandler } from '@smartsheet-extensions/handler';

export const serve = (main: ExtensionLambdaHandler) => async (payload: any) => {
  const MOCK_CONTEXT = {
    awsRequestId: '',
    functionName: '',
    functionVersion: '',
    callbackWaitsForEmptyEventLoop: false,
    invokedFunctionArn: '',
    logGroupName: '',
    logStreamName: '',
    memoryLimitInMB: '',
    getRemainingTimeInMillis: jest.fn(),
    done: jest.fn(),
    fail: jest.fn(),
    succeed: jest.fn(),
  };

  return new Promise(resolve => {
    main(payload, MOCK_CONTEXT, (err, result) => {
      if (err) {
        resolve(err);
      } else {
        resolve(result);
      }
    });
  });
};
