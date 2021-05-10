import {
  Chalk,
  Logger,
  UserError,
} from '@smartsheet-bridge/extension-cli-logger';
import { ExtensionInUseError } from '../errors/ExtensionInUseError';
import { getSpec } from '../utils';
import { createBridgeService } from './bridgeService';

const debug = Logger.debug('revokeService');
export interface CreateRevokeService {
  host: string;
  auth: string;
  options: {
    force: boolean;
    specFile: string;
    name?: string;
  };
}

export const createRevokeService = ({
  host,
  auth,
  options: { force, specFile, name },
}: CreateRevokeService) => {
  const sdk = createBridgeService(host, auth);
  return async () => {
    Logger.start('Reading extension');
    const spec = getSpec(specFile);
    const extensionName = name || spec.name;
    Logger.info('Extension name', Chalk.cyan(extensionName));
    Logger.start('Revoking extension');
    try {
      await sdk.extension.revoke({ extensionUUID: extensionName, force });
    } catch (err) {
      debug(err);
      if (err.response !== undefined && err.response.data !== undefined) {
        if (err.response.status === 409 && err.response.data !== undefined) {
          throw new ExtensionInUseError(
            extensionName,
            err.response.data.templates
          );
        } else if (err.response.status === 404) {
          throw new UserError(
            'Extension not found!',
            `No extension with the name '${Chalk.cyan(
              extensionName
            )}' exists on your account.`
          );
        }
      }
      throw new UserError(
        'Internal Error!',
        `Something went wrong when revoking '${Chalk.cyan(
          extensionName
        )}' from your account.`
      );
    }
    Logger.end();
  };
};

export type CreateRevokeServiceFn = typeof createRevokeService;
