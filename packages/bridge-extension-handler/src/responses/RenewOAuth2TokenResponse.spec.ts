import { ExtensionStatus } from '@smartsheet-extensions/handler';
import { RenewOAuth2TokenResponse } from './RenewOAuth2TokenResponse';

describe('RenewOAuth2TokenResponse', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setStatus', async () => {
    const response = new RenewOAuth2TokenResponse();
    response.setStatus(ExtensionStatus.SUCCESS);

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('create default', async () => {
    const response = RenewOAuth2TokenResponse.create();

    expect(response).toHaveProperty('status');
    expect(response.status).toEqual(ExtensionStatus.SUCCESS);
  });

  it('create complex', async () => {
    const response = RenewOAuth2TokenResponse.create({
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

  it('toSerializableObject', async () => {
    const response = RenewOAuth2TokenResponse.create({
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
