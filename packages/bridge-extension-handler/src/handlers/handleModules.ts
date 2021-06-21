import {
  BadRequestError,
  ExtensionHandlerEnhancer,
  isSerializableEmpty,
  isSerializableObject,
  NotFoundError,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { BadModuleResponseError } from '../errors/BadModuleResponseError';
import { Caller } from '../models/Caller';
import { ModuleResponse } from '../responses/ModuleResponse';
import { BridgeFunction } from '../types';

export type ModuleFunction<
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<ModuleResponse, Params, Settings>;
export interface ModulesConfig {
  modules?: { [moduleId: string]: ModuleFunction };
}

export const MODULE_EXEC = 'MODULE_EXEC';

export interface ModulePayload {
  event: typeof MODULE_EXEC;
  caller: Caller;
  payload: {
    moduleId: string;
    moduleParam: SerializableObject;
    registrationData: SerializableObject;
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

    const {
      moduleId,
      moduleParam,
      registrationData: settings = {},
    } = body.payload;
    const { caller } = body;

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
        caller,
        settings,
      }),
      (err?: Error, result?: unknown) => {
        if (err) {
          callback(err);
        } else if (result instanceof ModuleResponse) {
          callback(err, result);
        } else if (
          isSerializableObject(result) ||
          isSerializableEmpty(result)
        ) {
          callback(err, ModuleResponse.create({ value: result }));
        } else {
          throw new BadModuleResponseError(moduleId, typeof result);
        }
      }
    );
  };
};