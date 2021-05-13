import {
  AbstractError,
  ExtensionError,
  InternalError,
} from '@smartsheet-extensions/handler';

export class BadResponseError extends AbstractError {
  public constructor(moduleId: string, type: string) {
    super({
      code: ExtensionError.CODE,
      httpStatus: InternalError.STATUS,
      description: `Module \`${moduleId}\` must return an object or \`ModuleResponse\`. Type \`${type}\` found.`,
    });
  }
}
