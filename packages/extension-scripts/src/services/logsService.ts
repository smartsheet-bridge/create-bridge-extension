import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { getSpec } from '../utils';
import { createBridgeService } from './bridgeService';

interface CreateLogsServiceArgs {
  host: string;
  auth: string;
  options: {
    milliseconds: number;
    specPath: string;
    name?: string;
  };
}
export const createLogsService = ({
  host,
  auth,
  options: { milliseconds, specPath, name: extensionName },
}: CreateLogsServiceArgs) => {
  const sdk = createBridgeService(host, auth);

  const fetchCaller = async () => {
    const spec = getSpec(specPath);
    const { data } = await sdk.extensions.caller(extensionName || spec.name);
    if (data !== undefined) {
      const { caller } = data;
      return caller;
    }
  };

  const RPCLogs = (hostname: string, caller: any, millisecondsAgo: number) => {
    return new Promise(resolve => {
      const client = sdk.RPC(hostname).streamLogs({
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
    const answer = await Logger.prompt<{ reconnect: boolean }>({
      type: 'confirm',
      name: 'reconnect',
      message: 'Would you like to continue?',
      default: true,
    });
    if (answer.reconnect) {
      return streamLogs(hostname, Date.now() - date);
    }
  };

  return async () => {
    Logger.start('Authenticating platform');
    const { domain, port } = await sdk.platform();
    Logger.verbose('Platform', Chalk.cyan(`${domain}:${port}`));
    Logger.end();
    Logger.info(Chalk.cyan('Streaming logs...'));
    await streamLogs(`${domain}:${port}`, milliseconds);
  };
};
