import type { PackageJson } from '@npm/types';
import { sync } from 'find-up';
import { readJSONSync } from 'fs-extra';
import normalizeData from 'normalize-package-data';
import { SpecNotFoundError } from './errors/SpecNotFoundError';

export const getManifest = (): PackageJson => {
  const manifestPath = sync('package.json');
  const manifest: PackageJson = manifestPath ? readJSONSync(manifestPath) : {};
  normalizeData(manifest);
  return manifest;
};

export const getSpec = (filename: string): { name: string } | never => {
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

export const maskKey = (str: string) => str.replace(/.(?=.{4})/g, '*');
