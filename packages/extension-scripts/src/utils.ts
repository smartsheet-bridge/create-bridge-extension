import { PackageJson } from '@npm/types';
import { sync } from 'find-up';
import { readJSONSync } from 'fs-extra';
import { SpecNotFoundError } from './errors/SpecNotFoundError';

export interface ExtensionManifest extends PackageJson {
  displayName?: string;
}

export const getManifest = (): ExtensionManifest => {
  const manifestPath = sync('package.json');
  const manifest: ExtensionManifest = manifestPath
    ? readJSONSync(manifestPath)
    : {};
  return manifest;
};

export const getSpec = (filename = 'extension.json'): any | never => {
  const specPath = sync(filename);
  if (specPath === undefined || specPath === null) {
    throw new SpecNotFoundError(process.cwd());
  }
  const spec: PackageJson = specPath ? readJSONSync(specPath) : {};
  if (spec === undefined || Object.keys(spec).length === 0) {
    throw new SpecNotFoundError(specPath);
  }
  return spec;
};
