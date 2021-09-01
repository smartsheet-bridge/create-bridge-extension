/* eslint-disable global-require */

import { transformFileSync, TransformOptions } from '@babel/core';
import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { emptyDirSync, outputFileSync } from 'fs-extra';
import { glob } from 'glob';
import { format, parse, resolve } from 'path';

const debug = Logger.debug('buildService');

export interface CreateBuildServiceArgs {
  src: string;
  out: string;
  options: {
    include: string;
    exclude: string[];
    clean?: boolean;
  };
}

export const createBuildService = ({
  src,
  out,
  options: { include, exclude, clean = true },
}: CreateBuildServiceArgs) => {
  /**
   * Disable Browserslist old data warning as otherwise with every release we'd need to update this dependency
   * which is cumbersome considering the warning is not user actionable.
   * `Browserslist: caniuse-lite is outdated. Please run next command `npm update`
   * See: https://github.com/browserslist/browserslist/blob/819c4337456996d19db6ba953014579329e9c6e1/node.js#L324
   */
  process.env.BROWSERSLIST_IGNORE_OLD_DATA = 'true';

  Logger.start('Reading configuration');
  debug('src', src);
  debug('out', out);
  debug('options', { include, exclude, clean });

  const cwd = process.cwd();
  const srcDir = resolve(cwd, src);
  const outDir = resolve(cwd, out);
  Logger.verbose(`Found ${Chalk.green('src')} directory`, Chalk.cyan(srcDir));
  Logger.verbose(`Found ${Chalk.green('out')} directory`, Chalk.cyan(outDir));
  debug('Include', Chalk.cyan(include));
  debug('Exclude', exclude.map(excl => `\n  - ${Chalk.cyan(excl)}`).join(''));
  Logger.end();

  if (clean) {
    Logger.start('Cleaning `out` folder');
    emptyDirSync(outDir);
    Logger.end();
  }

  const build = () => {
    const allFiles = glob.sync(include, {
      ignore: exclude,
      cwd: srcDir,
      nodir: true,
    });
    debug('allFiles', allFiles);

    Logger.start(`Building ${Chalk.cyan(allFiles.length)} files`);
    allFiles.forEach(fileName => {
      Logger.verbose(`Building ${Chalk.cyan(fileName)}`);
      const absSrcPath = resolve(srcDir, fileName);
      const { name, ext, dir } = parse(fileName);
      const absOutDir = resolve(outDir, dir);
      const absOutPath = format({
        ext: '.js',
        dir: absOutDir,
        name,
      });

      const babelOpts: TransformOptions = {
        presets: [[require('@babel/preset-env'), { targets: { node: '12' } }]],
      };

      if (ext === '.ts') {
        babelOpts.presets.push(require('@babel/preset-typescript'));
      }

      debug(`Transforming ${Chalk.cyan(name)}`, absSrcPath);
      const { code } = transformFileSync(absSrcPath, babelOpts);

      debug(`Writing ${Chalk.cyan(name)}`, absOutPath);
      outputFileSync(absOutPath, code, { encoding: 'utf8' });
    });
    Logger.end();
  };

  return build;
};

export type CreateBuildServiceFn = typeof createBuildService;
