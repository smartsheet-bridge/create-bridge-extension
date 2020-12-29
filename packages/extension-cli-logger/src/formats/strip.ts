import stripAnsi from 'strip-ansi';
import { MESSAGE as MESSAGE_SYMBOL } from 'triple-beam';
import { format } from 'winston';

const MESSAGE: string = MESSAGE_SYMBOL as any;

export const strip = format((info, opts) => ({
  ...info,
  level: opts.level !== false ? stripAnsi(info.level) : info.level,
  message: opts.message !== false ? stripAnsi(info.message) : info.message,
  [MESSAGE]:
    opts.raw !== false && info[MESSAGE]
      ? stripAnsi(info[MESSAGE])
      : info[MESSAGE],
}));
