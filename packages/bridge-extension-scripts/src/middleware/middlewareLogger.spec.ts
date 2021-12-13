import { Logger } from '@smartsheet-bridge/extension-cli-logger';
import { LoglevelNotRecognized } from '../errors/LoglevelNotRecognized';
import { AuthOptions } from '../options';
import { CLIArguments } from '../types';
import { middlewareLogger } from './middlewareLogger';

const spyWarn = jest.spyOn(Logger, 'warn').mockImplementation();

describe('middlewareLogger', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('does not break w/ empty args', () => {
    expect(() =>
      middlewareLogger({} as CLIArguments<Partial<AuthOptions>>)
    ).not.toThrow();
    expect(spyWarn).not.toBeCalled();
  });
  it('does not break w/ args', () => {
    expect(() =>
      middlewareLogger({ loglevel: 'info' } as CLIArguments<
        Partial<AuthOptions>
      >)
    ).not.toThrow();
    expect(spyWarn).not.toBeCalled();
  });
  it('defaults and warns if loglevel is invalid', () => {
    middlewareLogger({ loglevel: 'abc' } as CLIArguments<Partial<AuthOptions>>);
    expect(spyWarn).toBeCalledTimes(1);
    expect(spyWarn).toBeCalledWith(new LoglevelNotRecognized('abc').toOut());
  });
  it.each([
    ['info', 'info'],
    ['INFO', 'info'],
    ['iNfO', 'info'],
    ['WARN', 'warn'],
    ['ERROR', 'error'],
    ['SILENT', 'silent'],
    ['VERBOSE', 'verbose'],
  ])('Given LOGLEVEL `%s` return `%s`', (argString, expectedLoglevel) => {
    const args = { loglevel: argString } as CLIArguments<Partial<AuthOptions>>;
    middlewareLogger(args);
    expect(args).toHaveProperty('loglevel', expectedLoglevel);
    expect(args).toHaveProperty('l', expectedLoglevel);
  });
});
