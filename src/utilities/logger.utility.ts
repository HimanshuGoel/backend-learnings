export class Logger {
  public static log(...args: unknown[]) {
    console.log(...args);
  }

  public static debug(...args: unknown[]) {
    console.debug(...args);
  }

  public static error(...args: unknown[]) {
    console.error(...args);
  }
}
