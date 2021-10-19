import {
  InternalError,
  SerializableObject,
} from '@smartsheet-extensions/handler';
import { ModuleResponse } from './ModuleResponse';

describe('ModuleResponse', () => {
  describe('constructor', () => {
    it('accepts when constructor given empty', () => {
      expect(new ModuleResponse()).toEqual({
        status: 0,
      });
      expect(ModuleResponse.create()).toEqual({
        status: 0,
      });
    });

    const VALID_CONSTRUCTOR_CASES = [
      [{}, { status: 0 }],
      [{ status: 0 }, { status: 0 }],
      [{ status: 1 }, { status: 1 }],
      [{ value: { a: 'test' } }, { status: 0, value: { a: 'test' } }],
      [{ exit: 'test' }, { status: 0, exit: 'test' }],
      [
        { value: { a: 'test' }, exit: 'test' },
        { status: 0, value: { a: 'test' }, exit: 'test' },
      ],
    ] as Array<[Partial<ModuleResponse>, Partial<ModuleResponse>]>;

    it.each(VALID_CONSTRUCTOR_CASES)(
      'accepts when constructor given %s, returns %s',
      (given, expected) => {
        const response = new ModuleResponse(given);
        expect(response).toEqual(expected);
      }
    );

    it.each(VALID_CONSTRUCTOR_CASES)(
      'accepts when static create given %s, returns %s',
      (given, expected) => {
        const response = ModuleResponse.create(given);
        expect(response).toEqual(expected);
      }
    );
  });

  describe('setExit', () => {
    const VALID_SET_EXIT_CASES = [undefined, '', 'test'] as string[];

    it.each(VALID_SET_EXIT_CASES)(
      'accepts when %s given %s, returns %s',
      given => {
        const response = new ModuleResponse();
        response.setExit(given);

        expect(response).toEqual({
          status: 0,
          exit: given,
        });
      }
    );

    const INVALID_SET_EXIT_CASES = [1, [], {}, true, null] as string[];

    it.each(INVALID_SET_EXIT_CASES)('throws when given %s', given => {
      const response = new ModuleResponse();
      expect(() => response.setExit(given)).toThrowError(
        new InternalError(
          `\`exit\` must be of type \`string\`. Received \`${typeof given}\`.`
        )
      );
    });
  });

  describe('setSuspendTime', () => {
    const VALID_SET_SUSPEND_TIME_CASES = [undefined, 0, 10] as number[];

    it.each(VALID_SET_SUSPEND_TIME_CASES)(
      'accepts when %s given %s, returns %s',
      given => {
        const response = new ModuleResponse();
        response.setSuspendTime(given);

        expect(response).toEqual({
          status: 0,
          suspendTime: given,
        });
      }
    );

    const INVALID_SET_SUSPEND_TIME_CASES = [
      'string',
      [],
      {},
      true,
      null,
    ] as number[];

    it.each(INVALID_SET_SUSPEND_TIME_CASES)('throws when given %s', given => {
      const response = new ModuleResponse();
      expect(() => response.setSuspendTime(given)).toThrowError(
        new InternalError(
          `\`suspendTime\` must be of type \`number\`. Received \`${typeof given}\`.`
        )
      );
    });
  });

  describe('setValue', () => {
    const VALID_SET_VALUE_CASES = [
      undefined,
      null,
      {},
      { a: 'test' },
      { a: { b: 'b' } },
    ] as SerializableObject[];

    it.each(VALID_SET_VALUE_CASES)(
      'accepts when given %s, returns %s',
      given => {
        const response = new ModuleResponse();
        response.setValue(given);

        expect(response).toEqual({
          status: 0,
          value: given,
        });
      }
    );

    const INVALID_SET_VALUE_CASES = ([
      1,
      [],
      'string',
      true,
      { a: () => {} },
      { a: { b: () => {} } },
    ] as unknown[]) as SerializableObject[];

    it.each(INVALID_SET_VALUE_CASES)('throws when given %s', given => {
      const response = new ModuleResponse();
      expect(() => response.setValue(given)).toThrowError(
        new InternalError(
          `\`value\` must be of type \`SerializableObject\`. Received \`${typeof given}\`.`
        )
      );
    });
  });
});
