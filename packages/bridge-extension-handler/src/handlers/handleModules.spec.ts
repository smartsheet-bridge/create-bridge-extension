import { createExtensionHandler } from '@smartsheet-extensions/handler';
import { BadResponseError } from '../errors/BadResponseError';
import { handleModules, ModulePayload, ModulesConfig } from './handleModules';

describe('handleModule', () => {
  const PAYLOAD: ModulePayload = {
    event: 'MODULE_EXEC',
    payload: {
      moduleId: 'moduleA',
      moduleParam: {},
      registrationData: {},
    },
  };

  const CALLBACK = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    {},
    { hello: 'world' },
    { a: ['b'] },
    { a: null },
    null,
    undefined,
  ] as any[])('returns when response is %s', async result => {
    const config: ModulesConfig = {
      modules: {
        moduleA: () => result,
      },
    };
    const handler = createExtensionHandler(handleModules(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
      value: result,
    });
  });
  it.each([100, 'string', true, false, ['an', 'array']] as any[])(
    'throws error when response is %s',
    async result => {
      const config: ModulesConfig = {
        modules: {
          moduleA: () => result,
        },
      };
      const handler = createExtensionHandler(handleModules(config));
      expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(
        new BadResponseError('moduleA', typeof result)
      );
    }
  );
  it('throws error if user throws error', async () => {
    const error = new Error('test error');
    const config: ModulesConfig = {
      modules: {
        moduleA: () => {
          throw error;
        },
      },
    };
    const handler = createExtensionHandler(handleModules(config));
    expect(() => handler(PAYLOAD, CALLBACK)).toThrowError(error);
  });
  it('returns when response is void', async () => {
    const config: ModulesConfig = {
      modules: {
        moduleA: () => {},
      },
    };
    const handler = createExtensionHandler(handleModules(config));
    expect(() => handler(PAYLOAD, CALLBACK)).not.toThrow();
    expect(CALLBACK).toBeCalledWith(null, {
      status: 0,
    });
  });
});
