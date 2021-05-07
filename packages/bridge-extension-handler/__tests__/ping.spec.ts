import { PingPayload } from '@smartsheet-extensions/handler';
import { createBridgeHandler } from '../lib';
import { serve } from './express';

describe('integration tests - ping', () => {
  const handler = createBridgeHandler({});
  it('should return 200 ok', async done => {
    const payload: PingPayload = {
      event: 'PING',
    };
    const res = await serve(handler).post('/').send(payload);
    expect(res.status).toBe(200);
    done();
  });
});
