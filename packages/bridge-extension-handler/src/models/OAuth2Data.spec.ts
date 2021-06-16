import { OAuth2Data } from './OAuth2Data';

describe('module tests - OAuth2Data', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setAccessToken', async () => {
    const data = OAuth2Data.create();
    data.setAccessToken('TOKEN');

    expect(data).toHaveProperty('access_token');
    expect(data.access_token).toEqual('TOKEN');
  });

  it('setExpiresIn', async () => {
    const data = new OAuth2Data();
    data.setExpiresIn(1000);

    expect(data).toHaveProperty('expires_in');
    expect(data.expires_in).toEqual(1000);
  });

  it('setGrantType', async () => {
    const data = new OAuth2Data();
    data.setGrantType('GRANT');

    expect(data).toHaveProperty('grant_type');
    expect(data.grant_type).toEqual('GRANT');
  });

  it('setMetadata', async () => {
    const data = new OAuth2Data();
    data.setMetadata({ key: 'value' });

    expect(data).toHaveProperty('metadata');
    expect(data.metadata).toEqual({ key: 'value' });
  });

  it('setRefreshToken', async () => {
    const data = new OAuth2Data();
    data.setRefreshToken('REFRESH');

    expect(data).toHaveProperty('refresh_token');
    expect(data.refresh_token).toEqual('REFRESH');
  });

  it('setTokenType', async () => {
    const data = new OAuth2Data();
    data.setTokenType('TYPE');

    expect(data).toHaveProperty('token_type');
    expect(data.token_type).toEqual('TYPE');
  });

  it('create', async () => {
    const data = OAuth2Data.create({
      access_token: 'TOKEN',
      expires_in: 1000,
      grant_type: 'GRANT',
      metadata: { key: 'value' },
      refresh_token: 'REFRESH',
      token_type: 'TYPE',
    });

    expect(data).toHaveProperty('access_token');
    expect(data.access_token).toEqual('TOKEN');
    expect(data).toHaveProperty('expires_in');
    expect(data.expires_in).toEqual(1000);
    expect(data).toHaveProperty('grant_type');
    expect(data.grant_type).toEqual('GRANT');
    expect(data).toHaveProperty('refresh_token');
    expect(data.refresh_token).toEqual('REFRESH');
    expect(data).toHaveProperty('token_type');
    expect(data.token_type).toEqual('TYPE');
  });
});
