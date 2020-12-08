export interface PluginParam {
  allowArray?: boolean;
  arrayItemsLabel?: string;
  description: string;
  displayName: string;
  hide?: boolean;
  hideExpression?: string;
  isOpen?: boolean;
  maxItems?: number;
  minItems?: number;
  optional: boolean;
  param: string;
  readOnly?: boolean;
  type: ParamType;
  value?: any[];
  valueParams?: PluginParam[];
}

export enum ParamType {
  Boolean = 'BOOLEAN',
  BridgeWorkflow = 'BRIDGE.WORKFLOW',
  Enum = 'ENUM',
  HTML = 'HTML',
  HTMLLink = 'HTML.LINK',
  Number = 'NUMBER',
  Map = 'MAP',
  Group = 'PARAM',
  Password = 'PASSWORD',
  String = 'STRING',
  Text = 'TEXT',
}
