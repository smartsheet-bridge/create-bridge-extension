import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import builder from 'esbuild';
import copyStaticFiles from 'esbuild-copy-static-files';
import { emptyDirSync, readdirSync } from 'fs-extra';
import { glob } from 'glob';
import { resolve } from 'path';

const debug = Logger.debug('buildService');

export interface CreateBuildServiceArgs {
  src: string;
  out: string;
  options: {
    staticDependencies?: string[];
    staticAssets?: string[];
    clean?: boolean;
    symlinks?: boolean;
    entrypoint?: string;
  };
}

const isSafePath = (path: string): boolean => {
  return !path.startsWith('/') && path.indexOf('..') < 0;
};

export const createBuildService = ({
  src,
  out,
  options: {
    staticDependencies = [],
    staticAssets = [],
    clean = true,
    symlinks = false,
    entrypoint = '',
  },
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
  debug('options', {
    staticDependencies,
    staticAssets,
    clean,
    symlinks,
  });

  const cwd = process.cwd();
  const srcDir = resolve(cwd, src);
  const outDir = resolve(cwd, out);
  Logger.verbose(`Found ${Chalk.green('src')} directory`, Chalk.cyan(srcDir));
  Logger.verbose(`Found ${Chalk.green('out')} directory`, Chalk.cyan(outDir));
  debug('Static Dependencies', staticDependencies);
  debug('Static Assets', staticAssets);
  Logger.end();

  if (clean) {
    Logger.start('Cleaning `out` folder');
    emptyDirSync(outDir);
    Logger.end();
  }

  debug(entrypoint);
  let script = '';
  if (entrypoint && isSafePath(entrypoint)) {
    script = entrypoint;
  } else {
    const srcContents = readdirSync(srcDir);
    if (srcContents.includes('index.ts')) {
      script = resolve(srcDir, 'index.ts');
    } else if (srcContents.includes('index.js')) {
      script = resolve(srcDir, 'index.js');
    } else {
      throw new Error('No suitable entrypoint found!');
    }
  }
  Logger.verbose(`Found ${Chalk.green('entrypoint')}`, Chalk.cyan(script));

  const build = async () => {
    Logger.start('Bundling files');

    const copyStaticDependenciesConfigs: builder.Plugin[] = staticDependencies
      .filter(isSafePath)
      .map(dep =>
        copyStaticFiles({
          src: resolve('node_modules', dep),
          dest: resolve(outDir, 'node_modules', dep),
          dereference: symlinks,
          errorOnExist: true,
          recursive: true,
        })
      );

    const copyStaticAssetsConfigs: builder.Plugin[] = staticAssets
      .filter(isSafePath)
      .map(pattern => glob.sync(pattern, { dot: true }))
      .reduce((list, sublist) => list.concat(sublist), [])
      .map(path =>
        copyStaticFiles({
          src: path,
          dest: resolve(outDir, path),
          dereference: symlinks,
          errorOnExist: true,
          recursive: true,
        })
      );

    const result = await builder.build({
      entryPoints: [script],
      bundle: true,
      platform: 'node',
      target: ['node12'],
      splitting: false,
      outdir: outDir,
      format: 'cjs',
      minify: true,
      sourcemap: true,
      external: staticDependencies,
      plugins: [...copyStaticDependenciesConfigs, ...copyStaticAssetsConfigs],
    });
    debug('Errors', result.errors);
    debug('Warnings', result.warnings);
    Logger.end();
  };

  return build;
};

export type CreateBuildServiceFn = typeof createBuildService;
