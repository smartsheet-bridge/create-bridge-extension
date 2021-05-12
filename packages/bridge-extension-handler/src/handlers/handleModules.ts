import {
  BadRequestError,
  ExtensionFunction,
  ExtensionHandlerEnhancer,
  NotFoundError,
} from '@smartsheet-extensions/handler';

export interface ModulesConfig {
  modules?: { [moduleId: string]: ExtensionFunction };
}

export const MODULE_EXEC = 'MODULE_EXEC';

export interface ModulePayload {
  event: typeof MODULE_EXEC;
  payload: {
    moduleId: string;
    moduleParam: object;
    registrationData: object;
  };
}

const isModulePayload = (payload: any): payload is ModulePayload =>
  payload.event === MODULE_EXEC;

export const handleModules = (
  config: ModulesConfig
): ExtensionHandlerEnhancer => create => () => {
  const next = create();
  return (body: ModulePayload, callback) => {
    if (!isModulePayload(body)) {
      throw new BadRequestError(
        'Payload must contain `event` property and `payload` property.'
      );
    }

    const { moduleId, moduleParam, registrationData } = body.payload;

    if (moduleId === undefined) {
      throw new BadRequestError(
        'Payload must contain property `moduleId` to execute a module.'
      );
    }

    if (
      config === undefined ||
      config.modules === undefined ||
      config.modules[moduleId] === undefined
    ) {
      throw new NotFoundError(`Module \`${moduleId}\` does not exist.`);
    }

    next(
      config.modules[moduleId](moduleParam, {
        registrationData,
      }),
      callback
    );
  };
};
