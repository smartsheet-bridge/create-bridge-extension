import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { ReleaseType } from 'semver';
import { AuthOptions } from '../options';
import { CLIArguments } from '../types';
import {
  getUpgradeWarning,
  middlewareVersionCheck,
} from './middlewareVersionCheck';

jest.mock('latest-version');
const latest = require('latest-version');

const spy = jest.spyOn(Logger, 'warn');

describe('middlewareVersionCheck', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.each([
    [
      'major',
      `This is a 'major' release which likely introduces some breaking changes.\nSee release for more details.`,
    ],
    [
      'premajor',
      `This is a 'premajor' release which likely introduces some breaking changes.\nSee release for more details.`,
    ],
    [
      'preminor',
      `This is a 'preminor' release which may introduce some breaking changes.\nSee release for more details.`,
    ],
    [
      'prepatch',
      `This is a 'prepatch' release which may introduce some breaking changes.\nSee release for more details.`,
    ],
    [
      'prerelease',
      `This is a 'prerelease' which may introduce some breaking changes.\nSee release for more details.`,
    ],
    ['minor', `This is a 'minor' release and is considered safe to upgrade.`],
    ['patch', `This is a 'patch' release and is considered safe to upgrade.`],
  ] as Array<[ReleaseType, string]>)(
    'returns the correct warning for `%s`',
    (releaseType, result) => {
      expect(getUpgradeWarning(releaseType)).toBe(result);
    }
  );

  it('catches error, warns, and carries on', async () => {
    latest.mockImplementation(() => Promise.reject());
    await expect(
      middlewareVersionCheck({} as CLIArguments<Partial<AuthOptions>>)
    ).resolves.toEqual(undefined);
    expect(spy).toBeCalledTimes(1);
  });

  it.each([
    '1.1.2',
    '1.2.2',
    '2.2.2',
    '1.1.2-beta.0',
    '1.2.2-beta.0',
    '2.2.2-beta.0',
  ] as string[])(
    'correctly warns for versions 1.1.1 and %s',
    async newVersion => {
      jest.doMock('../../package.json', () => ({
        name: '',
        version: '1.1.1',
      }));
      latest.mockImplementation(() => Promise.resolve(newVersion));
      await middlewareVersionCheck({} as CLIArguments<Partial<AuthOptions>>);
      expect(spy).toBeCalledTimes(1);
    }
  );

  it.each([
    '1.1.0',
    '1.0.1',
    '0.1.1',
    '1.1.1-beta.0',
    '1.1.0-beta.0',
    '1.0.1-beta.0',
    '0.1.1-beta.0',
  ] as string[])(
    "correctly doesn't warn for versions 1.1.1 and %s",
    async newVersion => {
      jest.doMock('../../package.json', () => ({
        name: '',
        version: '1.1.1',
      }));
      latest.mockImplementation(() => Promise.resolve(newVersion));
      await middlewareVersionCheck({} as CLIArguments<Partial<AuthOptions>>);
      expect(spy).not.toBeCalled();
    }
  );
});
