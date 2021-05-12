import { InternalError } from '../errors/InternalError';
import { createExtensionHandler, ExtensionHandlerEnhancer } from '../handler';
import { compose } from '../utils/compose';
import { xorHandler } from './xorHandler';

describe('XOR Enhancer', () => {
  const enhancer1Fn = jest.fn();
  const enhancer2Fn = jest.fn();

  const ENHANCER_1: ExtensionHandlerEnhancer = () => () => enhancer1Fn;
  const ENHANCER_2: ExtensionHandlerEnhancer = () => () => enhancer2Fn;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle one enhancer and ignore the other', done => {
    const extensibleHandler = createExtensionHandler(
      xorHandler({
        ENHANCER_1,
        ENHANCER_2,
      })
    );
    const payload = { event: 'ENHANCER_1' };
    const callback = () => {};
    extensibleHandler(payload, callback);
    expect(enhancer1Fn).toBeCalledTimes(1);
    expect(enhancer1Fn).toBeCalledWith(payload, callback);
    expect(enhancer2Fn).not.toBeCalled();
    done();
  });

  it('should handle one enhancer with custom payload', done => {
    const extensibleHandler = createExtensionHandler(
      xorHandler(
        {
          ENHANCER_1,
          ENHANCER_2,
        },
        {
          getFunctionKey: p => p.event.id,
        }
      )
    );
    const payload = { event: { id: 'ENHANCER_1' } };
    const callback = () => {};
    extensibleHandler(payload, callback);
    expect(enhancer1Fn).toBeCalledTimes(1);
    expect(enhancer1Fn).toBeCalledWith(payload, callback);
    expect(enhancer2Fn).not.toBeCalled();
    done();
  });

  it('throws error when no `enhancerKey` is found', done => {
    const extensibleHandler = createExtensionHandler(
      xorHandler({
        ENHANCER_1,
        ENHANCER_2,
      })
    );
    const payload = {};
    const callback = () => {};
    expect(() => extensibleHandler(payload, callback)).toThrowError(
      new InternalError('`enhancerKey` incorrectly defined in `xorHandler`.')
    );
    expect(enhancer1Fn).not.toBeCalled();
    expect(enhancer2Fn).not.toBeCalled();
    done();
  });

  it('should not interupt the execution flow', () => {
    const configOrder = [];
    const executionOrder = [];
    const enhancerA: ExtensionHandlerEnhancer = create => () => {
      configOrder.push('enhancerA:before');
      const h = create();
      configOrder.push('enhancerA:after');
      return (req, res) => {
        executionOrder.push('enhancerA:before');
        const result = h(req, res);
        executionOrder.push('enhancerA:after');
        return result;
      };
    };
    const enhancerB1: ExtensionHandlerEnhancer = create => () => {
      configOrder.push('enhancerB1:before');
      const h = create();
      configOrder.push('enhancerB1:after');
      return (req, res) => {
        executionOrder.push('enhancerB1:before');
        const result = h(req, res);
        executionOrder.push('enhancerB1:after');
        return result;
      };
    };
    const enhancerB2: ExtensionHandlerEnhancer = create => () => {
      configOrder.push('enhancerB2:before');
      const h = create();
      configOrder.push('enhancerB2:after');
      return (req, res) => {
        executionOrder.push('enhancerB2:before');
        const result = h(req, res);
        executionOrder.push('enhancerB2:after');
        return result;
      };
    };
    const enhancerC: ExtensionHandlerEnhancer = create => () => {
      configOrder.push('enhancerC:before');
      const h = create();
      configOrder.push('enhancerC:after');
      return (req, res) => {
        executionOrder.push('enhancerC:before');
        const result = h(req, res);
        executionOrder.push('enhancerC:after');
        return result;
      };
    };

    const xor = xorHandler({
      enhancerB1,
      enhancerB2,
    });

    const composedEnhancer = compose(enhancerA, xor, enhancerC);

    const extensibleHandler = createExtensionHandler(composedEnhancer);
    const payload = { event: 'enhancerB2' };
    const callback = () => {};

    extensibleHandler(payload, callback);

    expect(configOrder).toEqual([
      'enhancerA:before',
      'enhancerB1:before',
      'enhancerC:before',
      'enhancerC:after',
      'enhancerB1:after',
      'enhancerB2:before',
      'enhancerC:before',
      'enhancerC:after',
      'enhancerB2:after',
      'enhancerA:after',
    ]);

    expect(executionOrder).toEqual([
      'enhancerA:before',
      'enhancerB2:before',
      'enhancerC:before',
      'enhancerC:after',
      'enhancerB2:after',
      'enhancerA:after',
    ]);
  });
});
