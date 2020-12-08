export interface Webhook {
  id: string;
  name: string;
  description: string;
  showEndpoint: boolean;
  asyncResponse?: AsyncResponse;
  challengeIdentifier?: ChallengeIdentifier;
}

export interface AsyncResponse {
  body?: any;
  headers?: Map<string, string>;
  statusCode: number;
}

export interface ChallengeIdentifier {
  headers?: string[];
  method?: string;
  queryParams?: string[];
}
