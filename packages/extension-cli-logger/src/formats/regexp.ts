import { format } from 'winston';

export const regexp = format((info, opts: { pattern?: string | RegExp }) => {
  const pattern =
    typeof opts.pattern === 'string'
      ? new RegExp(opts.pattern, 'ig')
      : opts.pattern;

  if (info.pattern !== undefined) {
    return pattern !== undefined && pattern.test(info.pattern) && info;
  }
  return info;
});
