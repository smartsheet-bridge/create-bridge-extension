import { format } from 'winston';

export const regexp = format((info, opts: { pattern?: string | RegExp }) => {
  if (!info.pattern) {
    return info;
  }

  const pattern =
    typeof opts.pattern === 'string'
      ? new RegExp(opts.pattern, 'ig')
      : opts.pattern;

  return pattern !== undefined && pattern.test(info.pattern) && info;
});
