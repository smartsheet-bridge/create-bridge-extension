import { AuthOptions } from '../options';
import { CLIArguments } from '../types';
import { middlewareLogger } from './middlewareLogger';

describe('middlewareLogger', () => {
  it('does not break w/ empty args', () => {
    expect(() =>
      middlewareLogger({} as CLIArguments<Partial<AuthOptions>>)
    ).not.toThrow();
  });
  it('does not break w/ args', () => {
    expect(() =>
      middlewareLogger({ loglevel: 'info' } as CLIArguments<
        Partial<AuthOptions>
      >)
    ).not.toThrow();
  });
});
