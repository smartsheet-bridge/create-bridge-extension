export interface HttpResponse {
  body?: string;
  headers?: Record<string, string>;
  httpStatus: number;
}

export class HttpResponse {
  /**
   * The HTTP response expressed as a string.
   */
  body?: string;

  /**
   * The HTTP response headers.
   */
  headers?: Record<string, string>;

  /**
   * The HTTP response code.
   */
  httpStatus: number;

  public static create(props: Partial<HttpResponse> = {}) {
    return new HttpResponse(props);
  }

  public constructor({
    httpStatus,
    headers,
    body,
  }: Partial<HttpResponse> = {}) {
    if (httpStatus) this.setHttpStatus(httpStatus);
    if (headers) this.setHeaders(headers);
    if (body) this.setBody(body);
  }

  /**
   * Sets the HTTP response status code.
   * @param httpStatus The HTTP response status code.
   */
  setHttpStatus(httpStatus: number) {
    this.httpStatus = httpStatus;
  }

  /**
   * Sets the HTTP response headers.
   * @param headers The HTTP response headers.
   */
  setHeaders(headers: Record<string, string>) {
    this.headers = headers;
  }

  /**
   * Sets the HTTP response body.
   * @param body the HTTP response body.
   */
  setBody(body: string) {
    this.body = body;
  }
}
