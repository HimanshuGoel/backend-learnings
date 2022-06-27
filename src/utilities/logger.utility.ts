export class Logger {
  public static log(...args: any) {
    console.log(...args);
  }

  public static debug(...args: any[]) {
    console.debug(...args);
  }

  public static error(...args: any[]) {
    console.error(...args);
  }
}
