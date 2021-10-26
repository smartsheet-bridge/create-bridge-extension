interface Invoker {
  userUUID: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  systemAdmin?: boolean;
  providerUUID?: string;
}

interface Provider {
  providerUUID: string;
  workspaceUUID: string;
  providerDomain?: string;
}

interface CallToken {
  validUntil: number;
  signature: string;
}

export interface Caller {
  invoker: Invoker;
  provider: Provider;
  callTime: number;
  msgid: string;
  installUUID: string;
  pluginUUID: string;
  callToken: CallToken;
  revision: string;
  instanceID?: string;
}

export class Caller {
  /**
   * the bridge user that executed the function.
   */
  invoker: Invoker;

  /**
   * the bridge account that executed the function.
   */
  provider: Provider;

  /**
   * unix timestamp of when the function was executed.
   */
  callTime: number;

  /**
   * unique identifier for this function request.
   */
  msgid: string;

  /**
   * unique identifer for the extension runner.
   */
  installUUID: string;

  /**
   * unique identifier for the bridge extension.
   */
  pluginUUID: string;

  /**
   * an object used to validate the caller.
   */
  callToken: CallToken;

  /**
   * the extension revision code.
   */
  revision: string;

  /**
   * an identifer for the extension runner instance.
   */
  instanceID?: string;

  public static create(props: Partial<Caller> = {}) {
    return new Caller(props);
  }

  public constructor({
    invoker,
    provider,
    callTime,
    msgid,
    installUUID,
    pluginUUID,
    callToken,
    revision,
    instanceID,
  }: Partial<Caller> = {}) {
    if (invoker) this.invoker = invoker;
    if (provider) this.provider = provider;
    if (callTime) this.callTime = callTime;
    if (msgid) this.msgid = msgid;
    if (installUUID) this.installUUID = installUUID;
    if (pluginUUID) this.pluginUUID = pluginUUID;
    if (callToken) this.callToken = callToken;
    if (revision) this.revision = revision;
    if (instanceID) this.instanceID = instanceID;
  }
}
