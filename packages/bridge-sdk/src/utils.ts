import { URL } from 'url';

export interface AccountURL {
  accountName: string;
  hostName: string;
  protocol: string;
}

export const parseAccountURL = (accountURL: string): AccountURL => {
  if (!accountURL.startsWith('http')) {
    accountURL = `https://${accountURL}`;
  }
  const url = new URL(accountURL);

  const [accountName, ...rest] = url.host.split('.');
  const hostName = rest.join('.');
  const protocol = url.protocol.slice(0, -1);

  return {
    accountName,
    hostName,
    protocol,
  };
};
