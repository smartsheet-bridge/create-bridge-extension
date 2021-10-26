import * as dotpref from 'dotpref';
// import yargsParser from 'yargs-parser';
import { parse as yargsParser } from 'yargs';
import { AuthOptions } from '../options';
import { CLIArguments } from '../types';
import { middlewareAuth } from './middlewareAuth';

const URL1 = 'https://foo.example.com';
const URL2 = 'https://bar.example.com';
const URL_INLINE = 'https://baz.example.com';
const FOO = 'foo';
const BAR = 'bar';
const BAZ = 'baz';

const MOCK_PREFERENCES_MULTIPLE = {
  account: {
    default: {
      url: URL1,
      key: FOO,
    },
    account1: {
      url: URL2,
      key: BAR,
    },
  },
};

describe('middlewareAuth', () => {
  const get = jest.fn();
  const set = jest.fn();
  jest.spyOn(dotpref, 'createPref').mockImplementation(() => ({
    get,
    set,
    filePath: '',
    read: jest.fn(),
    reset: jest.fn(),
    write: jest.fn(),
  }));
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it.each([
    [`--url=${URL_INLINE} --key=${BAZ}`, URL_INLINE, BAZ],
    [`--url=${URL_INLINE} --key=${BAZ} --alias=default`, URL_INLINE, BAZ],
    [`--url=${URL_INLINE} --key=${BAZ} --alias=account1`, URL_INLINE, BAZ],
    [`--key=${BAZ}`, URL1, BAZ],
    [`--key=${BAZ} --alias=default`, URL1, BAZ],
    [`--key=${BAZ} --alias=account1`, URL2, BAZ],
    [`--url=${URL_INLINE}`, URL_INLINE, FOO],
    [`--url=${URL_INLINE} --alias=default`, URL_INLINE, FOO],
    [`--url=${URL_INLINE} --alias=account1`, URL_INLINE, BAR],
    [``, URL1, FOO],
    [` --alias=default`, URL1, FOO],
    [` --alias=account1`, URL2, BAR],
  ] as Array<[string, string, string]>)(
    'modifies the argv object with the correct url and key for `%s`',
    (argString, url, key) => {
      get.mockImplementation(k => MOCK_PREFERENCES_MULTIPLE[k]);
      const { _: yargs, ...args } = yargsParser(argString);
      middlewareAuth(args as CLIArguments<Partial<AuthOptions>>);
      expect(args).toHaveProperty('url', url);
      expect(args).toHaveProperty('key', key);
    }
  );
});
