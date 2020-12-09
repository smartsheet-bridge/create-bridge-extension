import { PluginParam } from './PluginParam';

export interface ModuleSpec {
  canAddExits?: boolean;
  description: string;
  documentLink?: string;
  exits?: string[];
  features?: string[];
  hasReturn: boolean;
  id: string;
  isDeprecated?: boolean;
  name: string;
  needsChannel?: boolean;
  needsOAuth?: boolean;
  orderBy?: number;
  param: PluginParam[];
  returnTypeSchema?: Map<string, any>;
}
