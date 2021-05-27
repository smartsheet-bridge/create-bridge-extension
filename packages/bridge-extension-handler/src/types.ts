import type {
  SerializableObject,
  ThunkFunction,
} from '@smartsheet-extensions/handler';
import { AbstractResponse } from './responses/AbstractResponse';

type BridgeFunctionResponseUnion<Response extends AbstractResponse> =
  | SerializableObject
  | Response
  | Promise<BridgeFunctionResponse<Response>>
  | void;

export type BridgeFunctionResponse<Response extends AbstractResponse> =
  | BridgeFunctionResponseUnion<Response>
  | ThunkFunction<BridgeFunctionResponseUnion<Response>>;
export interface BridgeContext<
  Settings extends SerializableObject = SerializableObject
> {
  settings: Settings;
}

export type BridgeFunction<
  Response extends AbstractResponse,
  Params extends SerializableObject = SerializableObject,
  Settings extends SerializableObject = SerializableObject
> = (
  parameters: Readonly<Params>,
  context: Readonly<BridgeContext<Readonly<Settings>>>
) => BridgeFunctionResponse<Response>;
