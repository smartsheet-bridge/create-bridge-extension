import { ExtensionError } from '@smartsheet-extensions/handler';

export class BadModuleResponseError extends ExtensionError {
  public constructor(moduleId: string, type: string) {
    super({
      description: `Module \`${moduleId}\` must return an object or \`ModuleResponse\`. Type \`${type}\` found.`,
    });
  }
}
