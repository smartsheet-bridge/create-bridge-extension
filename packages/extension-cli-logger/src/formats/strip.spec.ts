import chalk from 'chalk';
import { MESSAGE as MESSAGE_SYMBOL } from 'triple-beam';
import { strip } from './strip';

const MESSAGE: string = MESSAGE_SYMBOL as any;

describe('strip', () => {
  it.each(['abc', '123', '!@£', '🚀', 'ℷ∆ℇ', 'わわわ'] as string[])(
    'correctly strips asci characters but leaves original %s',
    text => {
      const original = {
        level: text,
        message: text,
        [MESSAGE]: text,
      };
      const chalked = {
        level: chalk.underline(text),
        message: chalk.underline(text),
        [MESSAGE]: chalk.underline(text),
      };
      expect(strip().transform(original)).toEqual(original);
      expect(strip().transform(chalked)).not.toEqual(chalked);
      expect(strip().transform(chalked)).toEqual(original);
    }
  );
  it.each(['level', 'message', 'raw'] as Array<'level' | 'message' | 'raw'>)(
    'does not strip asci characters from %s',
    key => {
      const prop = key === 'raw' ? MESSAGE : key;
      const given = {
        level: chalk.underline('text'),
        message: chalk.underline('text'),
        [MESSAGE]: chalk.underline('text'),
      };
      const expected = {
        level: 'text',
        message: 'text',
        [MESSAGE]: 'text',
        [prop]: chalk.underline('text'),
      };
      expect(strip().transform(given, { [key]: false })).toEqual(expected);
      expect(strip().transform(given, { [key]: false })).not.toEqual(given);
    }
  );
});
