import { Chalk, Logger } from '@smartsheet-bridge/extension-cli-logger';
import archiver from 'archiver';
import { Method } from 'axios';
import { createHash } from 'crypto';
import { createReadStream } from 'fs-extra';
import { vol } from 'memfs';
import { obj as multistream } from 'multistream';
import { resolve as resolvePath } from 'path';
import { getSpec } from '../utils';
import { createBridgeService } from './bridgeService';
import { Caller } from './http/extension';

const debug = Logger.debug('deployService');

export interface CreateDeployServiceArgs {
  host: string;
  auth: string;
  out: string;
  options: {
    symlinks?: boolean;
    specFile?: string;
  };
}

const VIRTUAL_FILE = '/extension.zip';
const INCLUDE = '**/**';
const EXCLUDE = '';

export const createDeployService = ({
  host,
  auth,
  out,
  options: { symlinks = false, specFile = 'extension.json' },
}: CreateDeployServiceArgs) => {
  debug('options', { symlinks, specFile });
  debug('build-out', out);

  const cwd = process.cwd();
  const buildOutDir = resolvePath(cwd, out);

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

      debug('include', INCLUDE);
      debug('exclude', EXCLUDE);

      archive.glob(
        INCLUDE,
        {
          cwd: buildOutDir,
          dot: false,
          ignore: EXCLUDE,
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
    const { uri, method } = caller!.data!.uploadTo;
    const response = sdk.instance(uri, {
      method: method as Method,
      data: stream,
      maxContentLength: 52428800,
      maxBodyLength: 52428800,
    });
    return response;
  };

  const activateRevision = async (caller: Caller) =>
    sdk.extension.activateRevision({
      extensionUUID: caller.data.id,
      revision: caller.data.revisionID,
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
    Logger.verbose('requestID', Chalk.cyan(caller.meta.requestID));
    Logger.verbose('version', Chalk.cyan(caller.meta.version));

    if (!caller.data.uploadTo) {
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
