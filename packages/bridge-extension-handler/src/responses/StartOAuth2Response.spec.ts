import { ExtensionStatus } from '@smartsheet-extensions/handler';
import { StartOAuth2Response } from './StartOAuth2Response';

describe('StartOAuth2Response', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setStatus', async () => {
    const response = new StartOAuth2Response();
    response.setStatus(ExtensionStatus.SUCCESS);

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('create default', async () => {
    const response = StartOAuth2Response.create();

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('create complex', async () => {
    const response = StartOAuth2Response.create({
      status: ExtensionStatus.FAIL,
      clientId: 'CLIENT_ID',
      oauth2URI: 'example.com/oauth',
      comment: 'comment data',
      extraParams: { key: 'value' },
      scope: 'create',
      state: 'QWERTY',
    });

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.FAIL);
    expect(response).toHaveProperty('clientId');
    expect(response.clientId).toEqual('CLIENT_ID');
    expect(response).toHaveProperty('oauth2URI');
    expect(response.oauth2URI).toEqual('example.com/oauth');
    expect(response).toHaveProperty('comment');
    expect(response.comment).toEqual('comment data');
    expect(response).toHaveProperty('extraParams');
    expect(response.extraParams).toEqual({ key: 'value' });
    expect(response).toHaveProperty('scope');
    expect(response.scope).toEqual('create');
    expect(response).toHaveProperty('state');
    expect(response.state).toEqual('QWERTY');
  });

  it('toSerializableObject', async () => {
    const response = StartOAuth2Response.create({
      status: ExtensionStatus.FAIL,
      clientId: 'CLIENT_ID',
      oauth2URI: 'example.com/oauth',
      comment: 'comment data',
      extraParams: { key: 'value' },
      scope: 'create',
      state: 'QWERTY',
    });

    const serializable = response.toSerializableObject();
    expect(serializable).toHaveProperty('status');
    expect(serializable.status).toEqual(ExtensionStatus.FAIL);
    expect(serializable).toHaveProperty('oauth2Setup');

    const data = serializable.oauth2Setup as any;
    expect(data).toHaveProperty('clientId');
    expect(data.clientId).toEqual('CLIENT_ID');
    expect(data).toHaveProperty('oauth2URI');
    expect(data.oauth2URI).toEqual('example.com/oauth');
    expect(data).toHaveProperty('comment');
    expect(data.comment).toEqual('comment data');
    expect(data).toHaveProperty('extraParams');
    expect(data.extraParams).toEqual({ key: 'value' });
    expect(data).toHaveProperty('scope');
    expect(data.scope).toEqual('create');
    expect(data).toHaveProperty('state');
    expect(data.state).toEqual('QWERTY');
  });
});
