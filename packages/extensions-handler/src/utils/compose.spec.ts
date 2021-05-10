import { compose } from './compose';

describe('compose', () => {
  it('should return the default function if no functions were given', () => {
    // @ts-ignore
    const composedFn = compose();
    expect(typeof composedFn === 'function').toBeTruthy();
    expect(composedFn('hello')).toBe('hello');
  });
  it('should return the first function if one functions were given', () => {
    const fn = (str: string) => `${str}`;
    const composedFn = compose(fn);
    expect(composedFn).toBe(fn);
    expect(composedFn('hello')).toBe('hello');
  });
  it('should return a composed function if more than one functions were given', () => {
    const fn1 = (str: string) => `f1 ${str}`;
    const fn2 = (str: string) => `f2 ${str}`;
    const composedFn = compose(fn1, fn2);
    expect(composedFn('hello')).toBe('f1 f2 hello');
  });
});
