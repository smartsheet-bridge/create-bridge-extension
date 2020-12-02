#!/usr/bin/env node

import { cosmiconfigSync as sync } from 'cosmiconfig';
import yargs from 'yargs';
import { accountCommand } from './commands/accountCommand';
import { deployCommand } from './commands/deployCommand';
import { logsCommand } from './commands/logsCommand';
import { revokeCommand } from './commands/revokeCommand';
import { middlewareLogger } from './middleware/middlewareLogger';
import { middlewareVersionCheck } from './middleware/middlewareVersionCheck';
import options, { RC_NAME } from './options';

export * from './types';

const configSearch = sync(RC_NAME).search();
let config = {};

if (configSearch && configSearch.config) {
  config = configSearch.config;
}

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
  .middleware(middlewareLogger, true)
  .middleware(middlewareVersionCheck)
  .options(options)
  .command(accountCommand)
  .command(deployCommand)
  .command(revokeCommand)
  .command(logsCommand)
  .demandCommand()
  .recommendCommands()
  .help()
  .parse();
