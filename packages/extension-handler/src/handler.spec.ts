import { ExtensionHandlerEnhancer } from '.';
import { createExtensionHandler } from './handler';
import { compose } from './utils/compose';

describe('createExtensionHandler', () => {
  const META = { registrationData: { hello: 'hello' } };

  it('should handle correct parameters', () => {
    const enhancer: ExtensionHandlerEnhancer = () => () => () => {};

    expect(() => createExtensionHandler()).not.toThrowError();
    expect(() => createExtensionHandler(enhancer)).not.toThrowError();
  });

  it('should throw error if enhancer is not a function', () => {
    expect(() =>
      // @ts-ignore
      createExtensionHandler({ test: () => '' }, 'string')
    ).toThrowError(
      'Invalid Configuration! Expected enhancer to be a function.'
    );
  });

  it('should throw error if function is invalid', () => {
    expect(() =>
      // @ts-ignore
      createExtensionHandler()()
    ).toThrowError(
      "Invalid Configuration! Cannot call a callback function of type 'undefined'"
    );
  });

  it('should call given function with metadata and parameters', () => {
    const TEST = { hello: 'world' };
    const callback = jest.fn().mockImplementation(a => a);
    const extensibleHandler = createExtensionHandler();
    extensibleHandler(TEST, callback);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toReturnWith(TEST);
  });

  it('should call enhancer', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const enhancer: ExtensionHandlerEnhancer = create => () => {
      mock1();
      const h = create();
      return (req, res) => {
        mock2();
        return h(req, res);
      };
    };

    const handler = createExtensionHandler(enhancer);
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).not.toBeCalled();

    handler({ meta: META, params: {}, func: () => {} }, () => {});
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(1);

    handler({ meta: META, params: {}, func: () => {} }, () => {});
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(2);
  });

  it('should call composed enhancer', () => {
    const mockA1 = jest.fn();
    const mockA2 = jest.fn();
    const mockB1 = jest.fn();
    const mockB2 = jest.fn();
    const enhancerA: ExtensionHandlerEnhancer = create => () => {
      mockA1();
      const h = create();
      return (req, res) => {
        mockA2();
        return h(req, res);
      };
    };
    const enhancerB: ExtensionHandlerEnhancer = create => () => {
      mockB1();
      const h = create();
      return (req, res) => {
        mockB2();
        return h(req, res);
      };
    };

    const composedEnhancer = compose(enhancerA, enhancerB);

    const handler = createExtensionHandler(composedEnhancer);
    expect(mockA1).toBeCalledTimes(1);
    expect(mockB1).toBeCalledTimes(1);

    expect(mockA2).not.toBeCalled();
    expect(mockA2).not.toBeCalled();

    handler({ meta: META, params: {}, func: () => {} }, () => {});
    expect(mockA1).toBeCalledTimes(1);
    expect(mockB1).toBeCalledTimes(1);

    expect(mockA2).toBeCalledTimes(1);
    expect(mockB2).toBeCalledTimes(1);

    handler({ meta: META, params: {}, func: () => {} }, () => {});
    expect(mockA1).toBeCalledTimes(1);
    expect(mockB1).toBeCalledTimes(1);

    expect(mockA2).toBeCalledTimes(2);
    expect(mockB2).toBeCalledTimes(2);
  });

  it('should execute enhancers from right to left', () => {
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
    const enhancerB: ExtensionHandlerEnhancer = create => () => {
      configOrder.push('enhancerB:before');
      const h = create();
      configOrder.push('enhancerB:after');
      return (req, res) => {
        executionOrder.push('enhancerB:before');
        const result = h(req, res);
        executionOrder.push('enhancerB:after');
        return result;
      };
    };

    const composedEnhancer = compose(enhancerA, enhancerB);

    const handler = createExtensionHandler(composedEnhancer);
    handler({ meta: META, params: {}, func: () => {} }, () => {});

    expect(configOrder).toEqual([
      'enhancerA:before',
      'enhancerB:before',
      'enhancerB:after',
      'enhancerA:after',
    ]);

    expect(executionOrder).toEqual([
      'enhancerA:before',
      'enhancerB:before',
      'enhancerB:after',
      'enhancerA:after',
    ]);
  });
});
