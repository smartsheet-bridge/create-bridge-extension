import type {
  SerializableObject,
  ThunkFunction,
} from '@smartsheet-extensions/handler';
import { Caller } from './models/Caller';
import { OAuth2Data } from './models/OAuth2Data';
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
  /**
   * An object that describes the Bridge account and user that has executed the function.
   */
  caller: Caller;
  /**
   * OAuth data that was generated as part of the extension setup provider OAuth flow.
   */
  oAuthData?: OAuth2Data;
  /**
   * An object that contains the extension settings.
   */
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
