import { ExtensionStatus } from '@smartsheet-extensions/handler';
import { HandleOAuth2CodeResponse } from './HandleOAuth2CodeResponse';

describe('HandleOAuth2CodeResponse', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setStatus', async () => {
    const response = new HandleOAuth2CodeResponse();
    response.setStatus(ExtensionStatus.SUCCESS);

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('setRedirectMessage', async () => {
    const response = new HandleOAuth2CodeResponse();
    response.setRedirectMessage('your done, go back to your chat');

    expect(response).toHaveProperty('redirectMessage');
    expect(response.redirectMessage).toEqual('your done, go back to your chat');
  });

  it('setRedirectTo', async () => {
    const response = new HandleOAuth2CodeResponse();
    response.setRedirectTo('example.com/redirect');

    expect(response).toHaveProperty('redirectTo');
    expect(response.redirectTo).toEqual('example.com/redirect');
  });

  it('setSettings', async () => {
    const response = new HandleOAuth2CodeResponse();
    response.setSettings({ key: 'value' });

    expect(response).toHaveProperty('settings');
    expect(response.settings).toEqual({ key: 'value' });
  });

  it('create default', async () => {
    const response = HandleOAuth2CodeResponse.create();

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('create complex', async () => {
    const response = HandleOAuth2CodeResponse.create({
      status: ExtensionStatus.FAIL,
      access_token: 'TOKEN',
      expires_in: 1000,
      grant_type: 'GRANT',
      metadata: { key: 'value' },
      refresh_token: 'REFRESH',
      token_type: 'TYPE',
    });

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.FAIL);
    expect(response).toHaveProperty('access_token');
    expect(response.access_token).toEqual('TOKEN');
    expect(response).toHaveProperty('expires_in');
    expect(response.expires_in).toEqual(1000);
    expect(response).toHaveProperty('grant_type');
    expect(response.grant_type).toEqual('GRANT');
    expect(response).toHaveProperty('refresh_token');
    expect(response.refresh_token).toEqual('REFRESH');
    expect(response).toHaveProperty('token_type');
    expect(response.token_type).toEqual('TYPE');
  });

  it('toSerializableObject with redirect', async () => {
    const response = HandleOAuth2CodeResponse.create({
      status: ExtensionStatus.FAIL,
      access_token: 'TOKEN',
      expires_in: 1000,
      grant_type: 'GRANT',
      metadata: { key: 'value' },
      refresh_token: 'REFRESH',
      token_type: 'TYPE',
      redirectMessage: 'a message',
      redirectTo: 'a url',
      settings: { key: 'value' },
    });

    const serializable = response.toSerializableObject();
    expect(serializable).toHaveProperty('status');
    expect(serializable.status).toEqual(ExtensionStatus.FAIL);
    expect(serializable).toHaveProperty('oauth2Token');
    expect(serializable).toHaveProperty('redirect');

    const token = serializable.oauth2Token as any;
    expect(token).toHaveProperty('access_token');
    expect(token.access_token).toEqual('TOKEN');
    expect(token).toHaveProperty('expires_in');
    expect(token.expires_in).toEqual(1000);
    expect(token).toHaveProperty('grant_type');
    expect(token.grant_type).toEqual('GRANT');
    expect(token).toHaveProperty('refresh_token');
    expect(token.refresh_token).toEqual('REFRESH');
    expect(token).toHaveProperty('token_type');
    expect(token.token_type).toEqual('TYPE');

    const redirectTo = serializable.redirect as any;
    expect(redirectTo).toHaveProperty('redirectMessage');
    expect(redirectTo.redirectMessage).toEqual('a message');
    expect(redirectTo).toHaveProperty('redirectTo');
    expect(redirectTo.redirectTo).toEqual('a url');
  });

  it('toSerializableObject without redirect', async () => {
    const response = HandleOAuth2CodeResponse.create({
      status: ExtensionStatus.FAIL,
      access_token: 'TOKEN',
      expires_in: 1000,
      grant_type: 'GRANT',
      metadata: { key: 'value' },
      refresh_token: 'REFRESH',
      token_type: 'TYPE',
    });

    const serializable = response.toSerializableObject();
    expect(serializable).toHaveProperty('status');
    expect(serializable.status).toEqual(ExtensionStatus.FAIL);
    expect(serializable).toHaveProperty('oauth2Token');
    expect(serializable.redirect).toBeUndefined();

    const token = serializable.oauth2Token as any;
    expect(token).toHaveProperty('access_token');
    expect(token.access_token).toEqual('TOKEN');
    expect(token).toHaveProperty('expires_in');
    expect(token.expires_in).toEqual(1000);
    expect(token).toHaveProperty('grant_type');
    expect(token.grant_type).toEqual('GRANT');
    expect(token).toHaveProperty('refresh_token');
    expect(token.refresh_token).toEqual('REFRESH');
    expect(token).toHaveProperty('token_type');
    expect(token.token_type).toEqual('TYPE');
  });
});
