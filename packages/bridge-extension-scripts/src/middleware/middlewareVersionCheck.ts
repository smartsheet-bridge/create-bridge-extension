/* eslint-disable global-require */
import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import hasYarn from 'has-yarn';
import latest from 'latest-version';
import Semver, { ReleaseType } from 'semver';
import { MiddlewareFunction } from 'yargs';
import { CLIArguments } from '../types';

const COLORS: Record<Semver.ReleaseType, typeof Chalk['red']> = {
  major: Chalk.hex('#E57373'),
  minor: Chalk.yellow,
  patch: Chalk.green,
  premajor: Chalk.hex('#E57373'),
  preminor: Chalk.yellow,
  prepatch: Chalk.green,
  prerelease: Chalk.green,
};

export const getUpgradeWarning = (upgradeType: ReleaseType) => {
  let msg = `This is a '${upgradeType}' `;
  if (upgradeType !== 'prerelease') msg = `${msg}release `;
  switch (upgradeType) {
    case 'major':
    case 'premajor':
      msg += `which likely introduces some breaking changes.\nSee release for more details.`;
      break;
    case 'preminor':
    case 'prepatch':
    case 'prerelease':
      msg += `which may introduce some breaking changes.\nSee release for more details.`;
      break;
    default:
      msg += `and is considered safe to upgrade.`;
      break;
  }

  return msg;
};

export const middlewareVersionCheck: MiddlewareFunction<CLIArguments> = async () => {
  const { name, version } = require('../../package.json');
  Logger.verbose('Version', Chalk.cyan(version));

  const UPGRADE_YARN = `yarn upgrade ${name} --latest -dev`;
  const UPGRADE_NPM = `npm install ${name} --save-dev`;

  try {
    const latestVersion = await latest(name, { version: 'latest' });

    if (Semver.gt(latestVersion, version)) {
      const versionDiff = Semver.diff(latestVersion, version);
      const color = COLORS[versionDiff];
      const versionStr = color(`v${version}`);
      const latestVersionStr = Chalk.green(`v${latestVersion}`);

      const msg = `A newer version of 'extension-scripts' is available!\nUpgrade from \`${versionStr}\` to \`${latestVersionStr}\` by running \n\n\t${Chalk.cyan(
        hasYarn() ? UPGRADE_YARN : UPGRADE_NPM
      )}\n\n${Chalk.italic(getUpgradeWarning(versionDiff))}\n`;

      Logger.warn(msg);
    }
  } catch (e) {
    Logger.warn('Unable to check version compatibility.');
  }
};
