#!/usr/bin/env node

import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import * as findUp from 'find-up';
import * as fs from 'fs-extra';
import { upperCase } from 'lodash';
import * as yargs from 'yargs';
import { deployCommand } from './commands/deployCommand';
import { logsCommand } from './commands/logsCommand';
import { revokeCommand } from './commands/revokeCommand';
import middleware from './middleware';
import options from './options';
import { CLI_PREFIX } from './types';
import { getManifest } from './utils';

export * from './types';

const configPath = findUp.sync([`.${CLI_PREFIX}`, `.${CLI_PREFIX}.json`]);
const config = configPath ? fs.readJSONSync(configPath) : {};

const manifest = getManifest();

const exiting: NodeJS.ExitListener = code => {
  if (code === 0) {
    Logger.info('👋 ', 'Exiting...');
  }
};

process.on('exit', exiting);

/**
 * Priority
 * 1. Command line args
 * 2. Configuration file [`.${CLI_PREFIX}`, `.${CLI_PREFIX}.json`]
 * 3. `${CLI_PREFIX}` property in `package.json`
 * 4. Properties in `package.json` – (only `name`, `displayName`, `description`)
 */

yargs
  .env(upperCase(CLI_PREFIX))
  .scriptName('extension-scripts')
  .config(config)
  .pkgConf(CLI_PREFIX)
  .config({
    name: manifest.name,
    displayName: manifest.displayName || manifest.name,
    description: manifest.description,
  })
  .middleware(middleware)
  .options(options)
  .command(deployCommand)
  .command(revokeCommand)
  .command(logsCommand)
  .demandCommand()
  .recommendCommands()
  .parse();
