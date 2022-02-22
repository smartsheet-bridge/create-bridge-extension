/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import archiver from 'archiver';
import { Method } from 'axios';
import { createHash } from 'crypto';
import { createReadStream } from 'fs-extra';
import { vol } from 'memfs';
import { obj as multistream } from 'multistream';
import { getSpec } from '../utils';
import { createBridgeService } from './bridgeService';
import { Caller } from './http/extension';

const debug = Logger.debug('deployService');

export interface CreateDeployServiceArgs {
  host: string;
  auth: string;
  options: {
    include: string;
    exclude: string[];
    symlinks: boolean;
    specFile?: string;
    env?: { [key: string]: string };
  };
}

const VIRTUAL_FILE = '/extension.zip';

export const createDeployService = ({
  host,
  auth,
  options: { include, exclude, symlinks, specFile },
}: CreateDeployServiceArgs) => {
  debug('options', { include, exclude, symlinks, specFile });
  const sdk = createBridgeService(host, auth);

  const archivePkg = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const streams: NodeJS.ReadableStream[] = [];
      const output = vol.createWriteStream(VIRTUAL_FILE);
      const hash = createHash('sha256');
      hash.setEncoding('hex');
      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      hash.on('finish', () => {
        resolve(hash.read());
      });

      output.on('close', () => {
        multistream(
          streams.sort().map(s => {
            return createReadStream(s as any);
          })
        ).pipe(hash);
      });

      archive.on('entry', (data: any) => {
        if (data.type === 'file') {
          debug(data);
          streams.push(data.sourcePath);
        }
      });

      archive.on('warning', err => {
        reject(err);
      });

      archive.on('error', err => {
        reject(err);
      });

      archive.pipe(output);

      debug('include', include);
      debug('exclude', exclude);

      archive.glob(
        include,
        {
          cwd: process.cwd(),
          dot: false,
          ignore: exclude,
          follow: symlinks,
        },
        {}
      );
      archive.finalize();
    });
  };

  const uploadSpec = async (checksum: string): Promise<Caller> => {
    const specification = getSpec(specFile);
    const data: Record<string, any> = {
      specification,
      invoker: { checksum },
      specificationVersion: 'legacy',
    };

    const response = await sdk.extension.uploadSpec({ data });
    return response && response.data;
  };

  const uploadPkg = async (caller: Caller) => {
    const stream = vol.createReadStream(VIRTUAL_FILE);
    const { uri, method } = caller!.Data!.uploadTo;
    const response = sdk.instance(uri, {
      method: method as Method,
      data: stream,
    });
    return response;
  };

  const activateRevision = async (caller: Caller) =>
    sdk.extension.activateRevision({
      extensionUUID: caller.Data.id,
      revision: caller.Data.revisionID,
    });

  return async () => {
    Logger.start('Authenticating platform');
    // TODO: We need an auth endpoint. Temporarily using `platform.get()` to auth before building.
    await sdk.platform.get();

    Logger.start('Bundling extension');
    const checksum = await archivePkg();
    Logger.verbose('checksum', Chalk.cyan(checksum));

    Logger.start('Uploading specification');
    const caller = await uploadSpec(checksum);
    debug('caller', caller);
    Logger.verbose('requestID', Chalk.cyan(caller.Meta.requestID));
    Logger.verbose('version', Chalk.cyan(caller.Meta.version));

    if (!caller.Data.uploadTo) {
      Logger.end();
      Logger.warn(
        'Skipping upload!',
        'Extension unchanged since last deployment.'
      );
    } else {
      Logger.start('Uploading bundle');
      await uploadPkg(caller);

      Logger.start('Activating revision');
      await activateRevision(caller);
    }

    Logger.end();
  };
};

export type CreateDeployServiceFn = typeof createDeployService;
