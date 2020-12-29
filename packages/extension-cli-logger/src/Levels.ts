export const LOG_LEVELS = {
  debug: 0,
  error: 1,
  warn: 2,
  info: 3,
  verbose: 4,
};

export type LogLevel = keyof typeof LOG_LEVELS;
