#!/usr/bin/env node

import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { cosmiconfigSync as sync } from 'cosmiconfig';
import yargs from 'yargs';
import { deployCommand } from './commands/deployCommand';
import { logsCommand } from './commands/logsCommand';
import { revokeCommand } from './commands/revokeCommand';
import middleware from './middleware';
import options from './options';

export * from './types';

export const RC_NAME = `extension`;
const configSearch = sync(RC_NAME).search();
let config = {};

if (configSearch && configSearch.config) {
  config = configSearch.config;
}

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
 * 3. 'extension' property of 'package.json'
 * 4. .extensionrc
 * 5. .extensionrc.json
 * 6. .extensionrc.yaml
 * 7. .extensionrc.yml
 * 8. .extensionrc.js
 * 9. extension.config.js
 */

yargs
  .env(RC_NAME.toUpperCase())
  .scriptName('extension-scripts')
  .config(config)
  .middleware(middleware, true)
  .options(options)
  .command(deployCommand)
  .command(revokeCommand)
  .command(logsCommand)
  .demandCommand()
  .recommendCommands()
  .help()
  .parse();
