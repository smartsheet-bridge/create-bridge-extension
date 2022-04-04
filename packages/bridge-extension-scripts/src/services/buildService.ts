import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import builder from 'esbuild';
import { emptyDirSync } from 'fs-extra';
import { resolve } from 'path';

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

  const build = async () => {
    Logger.start('Bundling files');
    try {
      const result = await builder.build({
        // TODO - Detect entrypoint
        entryPoints: ['src/index.ts'],
        bundle: true,
        platform: 'node',
        target: ['node12'],
        splitting: false,
        outdir: outDir,
        format: 'cjs',
        minify: true,
        sourcemap: true,
      });
      debug(`${Chalk.red('Errors')}`, result.errors);
      debug(`${Chalk.yellow('Warnings')}`, result.warnings);
    } finally {
      Logger.end();
    }
  };

  return build;
};

export type CreateBuildServiceFn = typeof createBuildService;
