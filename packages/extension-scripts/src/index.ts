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

const configPath = findUp.sync([`.${CLI_PREFIX}rc`, `.${CLI_PREFIX}rc.json`]);
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
 * 2. Env vars
 * 3. Config file
 * 4. `package.json`
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
  .middleware(middleware, true)
  .options(options)
  .command(deployCommand)
  .command(revokeCommand)
  .command(logsCommand)
  .demandCommand()
  .recommendCommands()
  .parse();
