#!/usr/bin/env node

import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { cosmiconfigSync as sync } from 'cosmiconfig';
import yargs from 'yargs';
import { createAccountCommand } from './commands/accountCommand';
import { createBuildCommand } from './commands/buildCommand';
import { createDeployCommand } from './commands/deployCommand';
import { createLogsCommand } from './commands/logsCommand';
import { createRevokeCommand } from './commands/revokeCommand';
import { middlewareLogger } from './middleware/middlewareLogger';
import { middlewareVersionCheck } from './middleware/middlewareVersionCheck';
import options, { RC_NAME } from './options';
import { createAccountService } from './services/accountService';
import { createBuildService } from './services/buildService';
import { createDeployService } from './services/deployService';
import { createLogsService } from './services/logsService';
import { createRevokeService } from './services/revokeService';

export * from './types';

const configSearch = sync(RC_NAME).search();
let config = {
  extends: '@smartsheet-bridge/extensionrc-standard',
};

if (configSearch && configSearch.config) {
  config = configSearch.config;
}

const handleFail = (msg: string, err: Error) => {
  if (err) {
    Logger.error(err);
  }
};

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
  .command(createAccountCommand(createAccountService))
  .command(createBuildCommand(createBuildService))
  .command(createDeployCommand(createDeployService, createBuildService))
  .command(createRevokeCommand(createRevokeService))
  .command(createLogsCommand(createLogsService))
  .demandCommand()
  .recommendCommands()
  .help()
  .alias('h', 'help')
  .alias('v', 'version')
  .fail(handleFail)
  .parse();
