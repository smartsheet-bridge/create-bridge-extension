import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import { getSpec } from '../utils';
import { createBridgeService } from './bridgeService';

const debug = Logger.debug('revokeService');

interface CreateRevokeService {
  host: string;
  auth: string;
  force: boolean;
}

export const createRevokeService = ({
  host,
  auth,
  force,
}: CreateRevokeService) => {
  const sdk = createBridgeService(host, auth);
  return async () => {
    Logger.start('Reading extension');
    const spec = getSpec();
    Logger.info('Extension name', Chalk.cyan(spec.name));
    Logger.start('Revoking extension');
    await sdk.extensions.revoke(spec.name, force);
    Logger.end();
  };
};
