import { OAuth2SetupData } from './OAuth2SetupData';

describe('module tests - OAuth2SetupData', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setClientId', async () => {
    const con = OAuth2SetupData.create();
    con.setClientId('CLIENT_ID');

    expect(con).toHaveProperty('clientId');
    expect(con.clientId).toEqual('CLIENT_ID');
  });

  it('setComment', async () => {
    const con = new OAuth2SetupData();
    con.setComment('comment data');

    expect(con).toHaveProperty('comment');
    expect(con.comment).toEqual('comment data');
  });

  it('setExtraParams', async () => {
    const con = new OAuth2SetupData();
    con.setExtraParams({ key: 'value' });

    expect(con).toHaveProperty('extraParams');
    expect(con.extraParams).toEqual({ key: 'value' });
  });

  it('setOAuth2URI', async () => {
    const con = new OAuth2SetupData();
    con.setOAuth2URI('example.com/oauth');

    expect(con).toHaveProperty('oauth2URI');
    expect(con.oauth2URI).toEqual('example.com/oauth');
  });

  it('setScope', async () => {
    const con = new OAuth2SetupData();
    con.setScope('scope string');

    expect(con).toHaveProperty('scope');
    expect(con.scope).toEqual('scope string');
  });

  it('setState', async () => {
    const con = new OAuth2SetupData();
    con.setState('STATE_STRING');

    expect(con).toHaveProperty('state');
    expect(con.state).toEqual('STATE_STRING');
  });

  it('create', async () => {
    const con = OAuth2SetupData.create({
      clientId: 'CLIENT_ID',
      comment: 'comment string',
      extraParams: { key: 'value' },
      oauth2URI: 'example.com/oauth',
      scope: 'scope value',
      state: 'callback state',
    });

    expect(con).toHaveProperty('clientId');
    expect(con).toHaveProperty('comment');
    expect(con).toHaveProperty('extraParams');
    expect(con).toHaveProperty('oauth2URI');
    expect(con).toHaveProperty('scope');
    expect(con).toHaveProperty('state');
    expect(con.clientId).toEqual('CLIENT_ID');
    expect(con.comment).toEqual('comment string');
    expect(con.extraParams).toEqual({ key: 'value' });
    expect(con.oauth2URI).toEqual('example.com/oauth');
    expect(con.scope).toEqual('scope value');
    expect(con.state).toEqual('callback state');
  });
});
