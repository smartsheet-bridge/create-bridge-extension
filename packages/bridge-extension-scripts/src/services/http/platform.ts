import { BridgeHTTPInstance } from './types';
import { createAPICall, createAPIModule } from './utils';

export const get = createAPICall((instance: BridgeHTTPInstance) => config =>
  instance.get('platform', config)
);

export default createAPIModule({ get });
