import { ExtensionResponse } from './ExtensionResponse';

export interface ErrorResponse extends ExtensionResponse {
  error: {
    code: string;
    description: string;
    httpStatus: number;
  };
}
