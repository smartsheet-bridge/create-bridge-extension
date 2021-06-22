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
import {
  ExternalChannelSettings,
  parseExternalChannelSettingsPayload,
} from '../models/ExternalChannelSettings';
import {
  getWorkflowRunFromPayloadObject,
  WorkflowRun,
} from '../models/WorkflowRun';
import { ModuleResponse } from '../responses/ModuleResponse';
import { BridgeContext, BridgeFunction } from '../types';

export type ModuleFunction<
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = BridgeFunction<ModuleResponse, Params, ModuleContext<Settings>>;

export interface ModuleContext<
  Settings extends SerializableObject = SerializableObject
> extends BridgeContext<Settings> {
  channelSettings?: Readonly<ExternalChannelSettings>;
  retryCount: number;
  workflowRun: Readonly<WorkflowRun>;
}

export interface ModulesConfig {
  modules?: { [moduleId: string]: ModuleFunction };
}

export const MODULE_EXEC = 'MODULE_EXEC';

export interface ModulePayload {
  event: typeof MODULE_EXEC;
  caller: Caller;
  payload: {
    conversation: SerializableObject;
    channelSetting?: SerializableObject;
    moduleId: string;
    moduleParam: SerializableObject;
    registrationData: SerializableObject;
    retryCount?: number;
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
      retryCount,
      channelSetting,
      conversation,
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

    const channelSettings = parseExternalChannelSettingsPayload(channelSetting);
    const workflowRun = getWorkflowRunFromPayloadObject(conversation);

    next(
      config.modules[moduleId](moduleParam, {
        caller,
        settings,
        retryCount: retryCount || 0,
        workflowRun,
        channelSettings,
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
