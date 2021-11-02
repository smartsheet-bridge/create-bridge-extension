import { PingPayload } from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../lib';
import { serve } from './express';

describe('integration tests - ping', () => {
  const handler = createBridgeHandler({});
  it('should return 200 ok', async done => {
    const payload: PingPayload = {
      event: 'PING',
    };
    await serve(handler)(payload);
    done();
  });
});
