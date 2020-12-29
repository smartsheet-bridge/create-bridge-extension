import { blue, Chalk, hex, reset } from 'chalk';
import { MESSAGE } from 'triple-beam';
import { format } from 'winston';

const ASCII_ARROW: string = '➤';
const ASCII_ERROR: string = '‼︎';
const ASCII_WARN: string = '!';
const ASCII_BOX_TOP: string = '┌';
const ASCII_BOX_MIDDLE: string = '│';
const ASCII_BOX_BOTTOM: string = '└';

const Symbols: Record<string, string> = {
  error: ASCII_ERROR,
  warn: ASCII_WARN,
  info: ASCII_ARROW,
  verbose: ASCII_ARROW,
  debug: ASCII_ARROW,
};

const Colors: Record<string, Chalk> = {
  error: hex('#E57373'),
  warn: hex('#FFF176'),
  info: blue,
  verbose: blue,
  debug: reset,
};

let isGrouped = false;

export const tty = format(info => {
  const msgs: string[] = [Colors[info.level](Symbols[info.level])];

  if (info.grouped === true) {
    msgs.push(ASCII_BOX_TOP);
    isGrouped = true;
  } else if (info.grouped === false) {
    msgs.push(ASCII_BOX_BOTTOM);
    isGrouped = false;
  } else if (isGrouped) {
    msgs.push(ASCII_BOX_MIDDLE);
  }

  msgs.push(info.message);

  return {
    ...info,
    [MESSAGE]: msgs.join(' '),
  };
});
