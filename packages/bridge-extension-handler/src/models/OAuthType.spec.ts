import { OAuthType } from './OAuthType';

describe('OAuthType', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('user', async () => {
    expect(OAuthType.User).toEqual(0);
  });

  it('provider', async () => {
    expect(OAuthType.Provider).toEqual(1);
  });
});
