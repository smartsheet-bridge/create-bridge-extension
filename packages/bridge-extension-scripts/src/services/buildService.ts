import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import builder from 'esbuild';
import copyStaticFiles from 'esbuild-copy-static-files';
import { emptyDirSync, readdirSync } from 'fs-extra';
import { resolve } from 'path';

const debug = Logger.debug('buildService');

export interface CreateBuildServiceArgs {
  src: string;
  out: string;
  options: {
    include: string;
    exclude: string[];
    staticDependencies: string[];
    clean?: boolean;
  };
}

const isSafePath = (path: string): boolean => {
  return !path.startsWith('/') && path.indexOf('..') < 0;
};

export const createBuildService = ({
  src,
  out,
  options: { include, exclude, staticDependencies, clean = true },
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
  debug('options', { include, exclude, staticDependencies, clean });

  const cwd = process.cwd();
  const srcDir = resolve(cwd, src);
  const outDir = resolve(cwd, out);
  Logger.verbose(`Found ${Chalk.green('src')} directory`, Chalk.cyan(srcDir));
  Logger.verbose(`Found ${Chalk.green('out')} directory`, Chalk.cyan(outDir));
  debug('Include', Chalk.cyan(include));
  debug('Exclude', exclude.map(excl => `\n  - ${Chalk.cyan(excl)}`).join(''));
  debug('Static Dependencies', staticDependencies);
  Logger.end();

  if (clean) {
    Logger.start('Cleaning `out` folder');
    emptyDirSync(outDir);
    Logger.end();
  }

  // TODO - Detect entrypoint
  let entrypoint = '';
  const srcContents = readdirSync(srcDir);
  if (srcContents.includes('index.ts')) {
    entrypoint = resolve(srcDir, 'index.ts');
  } else if (srcContents.includes('index.js')) {
    entrypoint = resolve(srcDir, 'index.js');
  } else {
    throw new Error('No suitable entrypoint found!');
  }

  const build = async () => {
    Logger.start('Bundling files');

    const copyStaticDependenciesConfigs: builder.Plugin[] = staticDependencies
      .filter(isSafePath)
      .map(dep =>
        copyStaticFiles({
          src: resolve('node_modules', dep),
          dest: resolve(outDir, 'node_modules', dep),
          dereference: true,
          errorOnExist: true,
          recursive: true,
        })
      );

    const result = await builder.build({
      entryPoints: [entrypoint],
      bundle: true,
      platform: 'node',
      target: ['node12'],
      splitting: false,
      outdir: outDir,
      format: 'cjs',
      minify: true,
      sourcemap: true,
      external: staticDependencies,
      plugins: [...copyStaticDependenciesConfigs],
    });
    debug(`${Chalk.red('Errors')}`, result.errors);
    debug(`${Chalk.yellow('Warnings')}`, result.warnings);
    Logger.end();
  };

  return build;
};

export type CreateBuildServiceFn = typeof createBuildService;
