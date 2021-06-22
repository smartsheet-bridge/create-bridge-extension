import type {
  SerializableObject,
  ThunkFunction,
} from '@smartsheet-extensions/handler';
import { Caller } from './models/Caller';
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
  caller: Caller;
  settings: Settings;
}

export type BridgeFunction<
  Response extends AbstractResponse,
  Params extends SerializableObject = SerializableObject,
  Context extends BridgeContext = BridgeContext
> = (
  parameters: Readonly<Params>,
  context: Readonly<Context>
) => BridgeFunctionResponse<Response>;
