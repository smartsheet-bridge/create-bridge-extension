/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { Caller, createGRPCClient } from '@smartsheet-bridge/bridge-sdk';
import {
  Chalk,
  Logger,
  UserError,
} from '@smartsheet-bridge/extension-cli-logger';
import archiver from 'archiver';
import { createHash } from 'crypto';
import { createReadStream } from 'fs-extra';
import { vol } from 'memfs';
import { obj as multistream } from 'multistream';
import * as semver from 'semver';
import { v4 as uuid } from 'uuid';
import { getSpec } from '../utils';
import { createBridgeService } from './bridgeService';

const debug = Logger.debug('deployService');

interface CreateDeployServiceArgs {
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
  options: { include, exclude, symlinks, specFile, env },
}: CreateDeployServiceArgs) => {
  debug('options', { include, exclude, symlinks, specFile, env });
  const sdk = createBridgeService(host, auth);
  const challengeUUID = uuid();

  const archivePkg = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const paths: string[] = [];
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
          paths.sort().map(s => {
            return createReadStream(s as any);
          })
        ).pipe(hash);
      });

      archive.on('entry', (data: any) => {
        Logger.verbose('Bundling:', data.name);
        if (data.type === 'file' && data.sourceType === 'stream') {
          paths.push(data.sourcePath);
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

      archive.append(`EXTENSION_CHALLENGE=${challengeUUID}`, {
        name: 'extension-scripts.env',
      });

      archive.finalize();
    });
  };

  const uploadSpec = async (checksum: string): Promise<Caller> => {
    const spec = getSpec(specFile);
    const data = {
      ...spec,
      invoker: { upload: true, checksum },
      appToken: challengeUUID,
    };

    const response = await sdk.extension.uploadSpec({ data });

    return response && response.data && response.data.uploadRef;
  };

  const uploadPkg = async (grpc: any, caller: Caller) => {
    const majorVersion = semver.major(process.version);
    return new Promise((resolve, reject) => {
      const client = grpc.uploadPluginCode((error: any, response: any) => {
        if (response) {
          debug('UPLOAD CODE', 'response', response);
          if (response.error) {
            return reject(
              new UserError(
                `${response.error.httpStatus} ${response.error.code}`,
                response.error.description
              )
            );
          }
          if (
            response.runtimeVersion !== undefined &&
            semver.clean(response.runtimeVersion) !==
              semver.clean(process.version)
          ) {
            Logger.warn(
              `Your development environment (Node.js ${process.version}) does not match Converse.AI's production environment (Node.js v${response.runtimeVersion})! This may lead to unexpected runtime errors. Please refer to our documentation for supported versions of Node.js.`
            );
          }
          return resolve();
        }
        if (error) {
          return reject(new Error(error));
        }
        return reject(new Error('Something went wrong!'));
      });
      Logger.verbose('Install UUID', Chalk.cyan(caller.installUUID));
      Logger.verbose('Revision ID', Chalk.cyan(caller.revision));
      Logger.verbose('NodeJS Major', Chalk.cyan(`${majorVersion}`));
      client.write({
        caller,
        majorVersion,
      });

      const stream = vol.createReadStream(VIRTUAL_FILE);
      stream
        .on('data', chunk => {
          Logger.verbose('UPLOAD CODE', `${Chalk.cyan(chunk.length)} Bytes`);
          client.write({
            data: chunk,
          });
        })
        .on('end', () => {
          client.end();
        });
    });
  };

  const setEnvironmentVariables = async (grpc: any, caller: Caller) => {
    return new Promise((resolve, reject) => {
      grpc.setPluginPrivateKeys(
        {
          caller,
          keys: env,
        },
        (err: any, response: any) => {
          if (
            response !== undefined &&
            response.error !== undefined &&
            response.error !== null
          ) {
            return reject(response.error);
          }
          if (err !== undefined && err !== null) {
            return reject(err);
          }
          return resolve();
        }
      );
    });
  };

  const activateRevision = async (caller: Caller) =>
    sdk.extension.activateRevision(
      {
        extensionUUID: caller.pluginUUID,
        revision: caller.revision,
      },
      {}
    );

  const hasENVVars = () => env !== undefined && Object.keys(env).length > 0;

  return async () => {
    Logger.start('Authenticating platform');
    const {
      data: {
        pluginDataService: { domain, port },
      },
    } = await sdk.platform.get();
    Logger.verbose('Platform', Chalk.cyan(`${domain}:${port}`));
    Logger.start('Bundling extension');
    const checksum = await archivePkg();
    Logger.verbose('checksum', Chalk.cyan(checksum));
    Logger.start('Uploading specification');
    const caller = await uploadSpec(checksum);
    debug('caller', caller);
    if (!caller) {
      Logger.end();
      Logger.warn(
        'Skipping upload!',
        'Extension unchanged since last deployment.'
      );
    } else {
      Logger.start(`Creating connection`);
      const client = createGRPCClient(`${domain}:${port}`);
      Logger.start('Uploading bundle');
      await uploadPkg(client, caller);
      Logger.start('Activating revision');
      await activateRevision(caller);
      if (hasENVVars()) {
        Logger.start('Setting environment variables');
        await setEnvironmentVariables(client, caller);
      }
    }
    Logger.end();
  };
};
