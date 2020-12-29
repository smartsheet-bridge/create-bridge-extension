import chalk from 'chalk';
import { MESSAGE as MESSAGE_SYMBOL } from 'triple-beam';
import { LogEntry } from '../Logger';
import { tty } from './tty';

const MESSAGE: string = MESSAGE_SYMBOL as any;

describe('tty', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it.each([
    [
      {
        level: 'debug',
        message: 'test',
      },
      `${chalk.reset('➤')} test`,
    ],
    [
      {
        level: 'info',
        message: 'test',
      },
      `${chalk.blue('➤')} test`,
    ],
    [
      {
        level: 'verbose',
        message: 'test',
      },
      `${chalk.blue('➤')} test`,
    ],
    [
      {
        level: 'warn',
        message: 'test',
      },
      `${chalk.hex('#FFF176')('!')} test`,
    ],
    [
      {
        level: 'error',
        message: 'test',
      },
      `${chalk.hex('#E57373')('‼︎')} test`,
    ],
    [
      {
        level: 'info',
        message: 'test',
        grouped: true,
      },
      `${chalk.blue('➤')} ┌ test`,
    ],
    [
      {
        level: 'info',
        message: 'test',
        grouped: false,
      },
      `${chalk.blue('➤')} └ test`,
    ],
  ] as Array<[LogEntry, string]>)(
    'correctly applies layout for %p',
    (entry, expectedStr) => {
      const result = tty().transform(entry) as LogEntry;
      expect(result.level).toBe(entry.level);
      expect(result.message).toBe(entry.message);
      expect(typeof result[MESSAGE]).toBe('string');
      expect(result[MESSAGE]).toBe(expectedStr);
    }
  );

  describe('correctly applies group', () => {
    it.each([
      [
        {
          level: 'info',
          message: 'test',
          grouped: true,
        },
        `${chalk.blue('➤')} ┌ test`,
      ],
      [
        {
          level: 'info',
          message: 'test',
        },
        `${chalk.blue('➤')} │ test`,
      ],
      [
        {
          level: 'info',
          message: 'test',
          grouped: false,
        },
        `${chalk.blue('➤')} └ test`,
      ],
    ] as Array<[LogEntry, string]>)(
      'correctly applies layout for %p',
      (entry, expectedStr) => {
        const result = tty().transform(entry) as LogEntry;
        expect(result.level).toBe(entry.level);
        expect(result.message).toBe(entry.message);
        expect(typeof result[MESSAGE]).toBe('string');
        expect(result[MESSAGE]).toBe(expectedStr);
      }
    );
  });
});
