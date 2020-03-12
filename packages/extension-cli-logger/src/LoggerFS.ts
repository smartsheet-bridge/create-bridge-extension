import stripAnsi from 'strip-ansi';
import { LoggerOut } from './LoggerOut';

export class LoggerFS extends LoggerOut {
  public write(str: string): void {
    super.write(stripAnsi(str));
  }
}
