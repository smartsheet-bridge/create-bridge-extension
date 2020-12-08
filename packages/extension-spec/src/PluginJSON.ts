import { ModuleSpec } from './ModuleSpec';
import { PluginParam } from './PluginParam';
import { Webhook } from './Webhook';

export interface PluginJSON {
  category?: string;
  description: string;
  displayName: string;
  documentLink?: string;
  externalCalls?: string[];
  features?: string[];
  hasOAuth?: boolean;
  instanceGroup?: string;
  isChannel?: boolean;
  isDeprecated?: boolean;
  logoName?: string;
  module?: ModuleSpec[];
  needsOAuth?: boolean;
  name: string;
  providerData?: any[];
  triggerSchema?: PluginParam[];
  uiSpec?: any;
  version?: string;
  webhooks?: Webhook[];
}
