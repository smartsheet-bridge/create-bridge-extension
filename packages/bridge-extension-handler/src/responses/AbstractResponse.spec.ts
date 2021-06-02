import { ExtensionStatus, InternalError } from '@smartsheet-extensions/handler';
import { AbstractResponse } from './AbstractResponse';

describe('ModuleResponse', () => {
  class TestResponse extends AbstractResponse {}

  it('accepts when constructor given empty', () => {
    const response = new TestResponse();
    expect(response).toEqual({
      status: 0,
    });
  });

  const VALID_CASES = [
    [ExtensionStatus.SUCCESS, { status: 0 }],
    [ExtensionStatus.FAIL, { status: 1 }],
    [ExtensionStatus.RETRY, { status: 2 }],
    [ExtensionStatus.STOP, { status: 3 }],
    [ExtensionStatus.PAUSE, { status: 4 }],
    [ExtensionStatus.NEED_AUTH, { status: 5 }],
    [ExtensionStatus.END, { status: 6 }],
    [0, { status: 0 }],
    [1, { status: 1 }],
    [2, { status: 2 }],
    [3, { status: 3 }],
    [4, { status: 4 }],
    [5, { status: 5 }],
    [6, { status: 6 }],
  ] as Array<[ExtensionStatus, Partial<AbstractResponse>]>;

  it.each(VALID_CASES)(
    'accepts when constructor given %s, returns %s',
    (given, expected) => {
      const response = new TestResponse(given);
      expect(response).toEqual(expected);
    }
  );

  it.each(VALID_CASES)(
    'accepts when setter given %s, returns %s',
    (given, expected) => {
      const response = new TestResponse();
      response.setStatus(given);
      expect(response).toEqual(expected);
    }
  );

  const INVALID_CASES = [
    -1,
    7,
    Number.MAX_VALUE,
    Number.MIN_VALUE,
    'string',
    [],
    {},
    true,
  ] as number[];

  it.each(INVALID_CASES)('throws when constructor given %s', given => {
    expect(() => new TestResponse(given)).toThrowError(
      new InternalError(
        `\`status\` must be of type \`ExtensionStatus\` or \`number\` between 0 and 6. Recieved \`${typeof given}\`.`
      )
    );
  });

  it.each(INVALID_CASES)('throws when setter given %s', given => {
    const response = new TestResponse();
    expect(() => response.setStatus(given)).toThrowError(
      new InternalError(
        `\`status\` must be of type \`ExtensionStatus\` or \`number\` between 0 and 6. Recieved \`${typeof given}\`.`
      )
    );
  });
});
