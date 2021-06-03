import { ChannelUserInfo } from './ChannelUserInfo';

describe('model tests - ChannelUserInfo', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setEmail', async () => {
    const channelUserInfo = new ChannelUserInfo();
    channelUserInfo.setEmail('admin@example.com');
    expect(channelUserInfo).toHaveProperty('email');
    expect(channelUserInfo.email).toEqual('admin@example.com');
  });

  it('setFirstName', async () => {
    const channelUserInfo = new ChannelUserInfo();
    channelUserInfo.setFirstName('name');
    expect(channelUserInfo).toHaveProperty('firstName');
    expect(channelUserInfo.firstName).toEqual('name');
  });

  it('setLanguage', async () => {
    const channelUserInfo = new ChannelUserInfo();
    channelUserInfo.setLanguage('EN');
    expect(channelUserInfo).toHaveProperty('language');
    expect(channelUserInfo.language).toEqual('EN');
  });

  it('setLastName', async () => {
    const channelUserInfo = new ChannelUserInfo();
    channelUserInfo.setLastName('surname');
    expect(channelUserInfo).toHaveProperty('lastName');
    expect(channelUserInfo.lastName).toEqual('surname');
  });

  it('setLocale', async () => {
    const channelUserInfo = new ChannelUserInfo();
    channelUserInfo.setLocale('GB');
    expect(channelUserInfo).toHaveProperty('locale');
    expect(channelUserInfo.locale).toEqual('GB');
  });

  it('setPhoneNumber', async () => {
    const channelUserInfo = new ChannelUserInfo();
    channelUserInfo.setPhoneNumber('555 123 4567');
    expect(channelUserInfo).toHaveProperty('phoneNumber');
    expect(channelUserInfo.phoneNumber).toEqual('555 123 4567');
  });

  it('setTimezone', async () => {
    const channelUserInfo = ChannelUserInfo.create();
    channelUserInfo.setTimezone('BST');
    expect(channelUserInfo).toHaveProperty('timezone');
    expect(channelUserInfo.timezone).toEqual('BST');
  });

  it('create', async () => {
    const channelUserInfo = ChannelUserInfo.create({
      email: 'admin@example.com',
      firstName: 'name',
      language: 'EN',
      lastName: 'surname',
      locale: 'GB',
      phoneNumber: '555 123 4567',
      timezone: 'BST',
    });

    expect(channelUserInfo).toHaveProperty('email');
    expect(channelUserInfo).toHaveProperty('firstName');
    expect(channelUserInfo).toHaveProperty('language');
    expect(channelUserInfo).toHaveProperty('lastName');
    expect(channelUserInfo).toHaveProperty('locale');
    expect(channelUserInfo).toHaveProperty('phoneNumber');
    expect(channelUserInfo).toHaveProperty('timezone');

    expect(channelUserInfo.email).toEqual('admin@example.com');
    expect(channelUserInfo.firstName).toEqual('name');
    expect(channelUserInfo.language).toEqual('EN');
    expect(channelUserInfo.lastName).toEqual('surname');
    expect(channelUserInfo.locale).toEqual('GB');
    expect(channelUserInfo.phoneNumber).toEqual('555 123 4567');
    expect(channelUserInfo.timezone).toEqual('BST');
  });
});
