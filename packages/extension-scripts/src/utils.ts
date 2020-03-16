import { PackageJson } from '@npm/types';
import { sync } from 'find-up';
import { readJSONSync } from 'fs-extra';
import normalizeData from 'normalize-package-data';
import { EnvParserError } from './errors/EnvParserError';
import { SpecNotFoundError } from './errors/SpecNotFoundError';

export const getManifest = (): PackageJson => {
  const manifestPath = sync('package.json');
  const manifest: PackageJson = manifestPath ? readJSONSync(manifestPath) : {};
  normalizeData(manifest);
  return manifest;
};

export const getSpec = (filename: string): any | never => {
  const specPath = sync(filename);
  if (specPath === undefined || specPath === null) {
    throw new SpecNotFoundError(filename, process.cwd());
  }
  const spec: PackageJson = specPath ? readJSONSync(specPath) : {};
  if (spec === undefined || Object.keys(spec).length === 0) {
    throw new SpecNotFoundError(filename, specPath);
  }
  return spec;
};

export interface ENVMap {
  [key: string]: string;
}

type ENVString = string;

export type ENVPossibleInput = Array<ENVString | ENVMap> | ENVMap;

const normalizeEnv = (
  acc: ENVMap,
  entry: ENVString | [string, string]
): ENVMap => {
  let envKey: string;
  let envValue: string;
  if (typeof entry === 'string') {
    [envKey, envValue] = entry.split(':');
  } else if (Array.isArray(entry)) {
    [envKey, envValue] = entry;
  }
  if (
    envKey === undefined ||
    envKey === '' ||
    envValue === undefined ||
    envValue === ''
  ) {
    throw new EnvParserError(`${envKey}:${envValue}`);
  }
  return {
    ...acc,
    [envKey.trim()]: envValue.trim(),
  };
};

export const buildEnvironmentVariables = (env?: ENVPossibleInput): ENVMap => {
  if (Array.isArray(env)) {
    return env.reduce<ENVMap>((acc, entry) => {
      if (typeof entry === 'string') {
        return normalizeEnv(acc, entry);
      } else {
        return { ...acc, ...buildEnvironmentVariables(entry) };
      }
    }, {});
  } else if (typeof env === 'object') {
    return Object.entries(env).reduce<ENVMap>(
      (acc, entry) => normalizeEnv(acc, entry),
      {}
    );
  }
  return {};
};
