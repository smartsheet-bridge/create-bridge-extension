import { createAPICall, createAPIModule } from '../utils';
import { BridgeHTTPInstance } from './types';

export const get = createAPICall((instance: BridgeHTTPInstance) => config =>
  instance.get('platform', config)
);

export default createAPIModule({ get });
