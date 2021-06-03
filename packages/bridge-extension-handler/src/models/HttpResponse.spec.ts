import { HttpResponse } from './HttpResponse';

describe('model tests - HttpResponse', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setBody', async () => {
    const response = new HttpResponse();
    response.setBody('body contents');

    expect(response).toHaveProperty('body');
    expect(response.body).toEqual('body contents');
  });

  it('setHeaders', async () => {
    const response = new HttpResponse();
    response.setHeaders({
      Accept: '*',
      'Content-Type': 'application/json',
    });

    expect(response).toHaveProperty('headers');
    expect(response.headers.Accept).toEqual('*');
    expect(response.headers['Content-Type']).toEqual('application/json');
  });

  it('setHttpStatus', async () => {
    const response = HttpResponse.create();
    response.setHttpStatus(404);

    expect(response).toHaveProperty('httpStatus');
    expect(response.httpStatus).toEqual(404);
  });

  it('create', async () => {
    const response = HttpResponse.create({
      body: 'body contents',
      headers: {
        Accept: '*',
        'Content-Type': 'application/json',
      },
      httpStatus: 404,
    });

    expect(response).toHaveProperty('body');
    expect(response.body).toEqual('body contents');
    expect(response).toHaveProperty('headers');
    expect(response.headers.Accept).toEqual('*');
    expect(response.headers['Content-Type']).toEqual('application/json');
    expect(response).toHaveProperty('httpStatus');
    expect(response.httpStatus).toEqual(404);
  });
});
