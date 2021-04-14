/**
 * Composes single-argument functions from right to left.
 *
 * @returns R function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;

export function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)));
}
