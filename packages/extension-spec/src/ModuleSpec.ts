import { PluginParam } from './PluginParam';

export interface ModuleSpec {
  param: PluginParam[];
  features: string[];
  exits: string[];
  id: string;
  name: string;
  description: string;
  documentLink: string;
  returnTypeSchema: Map<string, any>;
  orderBy: number;
  canAddExits: boolean;
  isDeprecated: boolean;
  hasReturn: boolean;
  needsOAuth: boolean;
  needsChannel: boolean;
}
