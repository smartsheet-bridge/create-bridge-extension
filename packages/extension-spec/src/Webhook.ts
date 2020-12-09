export interface Webhook {
  asyncResponse?: AsyncResponse;
  challengeIdentifier?: ChallengeIdentifier;
  description: string;
  id: string;
  name: string;
  showEndpoint: boolean;
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
