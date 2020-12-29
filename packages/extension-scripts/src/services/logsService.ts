import { createGRPCClient } from '@smartsheet-bridge/bridge-sdk';
import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { prompt } from 'inquirer';
import { getSpec } from '../utils';
import { createBridgeService } from './bridgeService';

export interface CreateLogsServiceArgs {
  host: string;
  auth: string;
  options: {
    milliseconds: number;
    specFile: string;
    name?: string;
  };
}

export const createLogsService = ({
  host,
  auth,
  options: { milliseconds, specFile, name: extensionName },
}: CreateLogsServiceArgs) => {
  const sdk = createBridgeService(host, auth);

  const fetchCaller = async () => {
    const spec = getSpec(specFile);
    const { data } = await sdk.extension.caller({
      extensionUUID: extensionName || spec.name,
    });
    if (data !== undefined) {
      const { caller } = data;
      return caller;
    }
  };

  const RPCLogs = (hostname: string, caller: any, millisecondsAgo: number) => {
    return new Promise(resolve => {
      const client = createGRPCClient(hostname).streamLogs({
        caller,
        fromTimestamp: Date.now() - millisecondsAgo,
      });

      client.on('data', (response: any) => {
        if (response.record) {
          if (response.record.logType === 'ERROR') {
            console.error(
              Chalk.red(
                new Date(parseInt(response.record.timestamp, 10)).toString(),
                response.record.logType
              ),
              ...JSON.parse(response.record.message)
            );
          } else {
            console.log(
              new Date(parseInt(response.record.timestamp, 10)).toString(),
              response.record.logType,
              ...JSON.parse(response.record.message)
            );
          }
        }
      });
      client.on('end', () => {
        resolve();
      });
    });
  };

  const streamLogs = async (
    hostname: string,
    millisecondsAgo: number
  ): Promise<void> => {
    const caller = await fetchCaller();
    await RPCLogs(hostname, caller, millisecondsAgo);
    Logger.info(Chalk.yellow('No logs have been sent in over a minute.'));
    const date = Date.now();
    const answer = await prompt<{ reconnect: boolean }>({
      type: 'confirm',
      name: 'reconnect',
      message: 'Would you like to continue?',
      default: true,
    });
    if (answer.reconnect) {
      Logger.verbose('Restarting stream');
      return streamLogs(hostname, Date.now() - date);
    }
    Logger.verbose('Closing stream');
  };

  return async () => {
    Logger.start('Authenticating platform');
    const {
      data: {
        pluginDataService: { domain, port },
      },
    } = await sdk.platform.get();
    Logger.verbose('Platform', Chalk.cyan(`${domain}:${port}`));
    Logger.end();
    Logger.info(Chalk.cyan('Streaming logs...'));
    await streamLogs(`${domain}:${port}`, milliseconds);
  };
};

export type CreateLogsServiceFn = typeof createLogsService;
