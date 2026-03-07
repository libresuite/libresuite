import chalk from "chalk";
import { format } from "date-fns";

enum LogLevel {
  INFO = "INFO",
  ERROR = "ERROR",
  WARN = "WARN",
  DEBUG = "DEBUG",
  SUCCESS = "SUCCESS",
}

enum LogColor {
  INFO = "blue",
  ERROR = "red",
  WARN = "yellow",
  DEBUG = "gray",
  SUCCESS = "green",
}

type LogProperties = {
  message: string | object;
  level: LogLevel;
  owner: string;
  status?: number | string;
  aligned?: boolean;
};

class Logger {
  private formatMessage(
    message: string | object,
    level: LogLevel,
    owner: string,
    status?: number | string,
    aligned?: boolean,
  ) {
    const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const isError = status && typeof status === "number" && status >= 400;
    const isSuccess = status && typeof status === "number" && status < 400;
    const color = isError
      ? LogColor.ERROR
      : isSuccess || typeof status === "string"
        ? LogColor.SUCCESS
        : LogColor[level];

    const strings = [
      `${aligned ? "\t" : ""}${chalk[LogColor[level]](`[${level.toUpperCase()}]`)}`,
      `${aligned ? "\t" : ""}${chalk[LogColor[level]](`[${timestamp}]`)}`,
      `${aligned ? "\t" : ""}${chalk[LogColor[level]](`[${owner}]`)}`,
      `${aligned ? "\t" : ""}${chalk.whiteBright(typeof message === "string" ? message : JSON.stringify(message))}`.trim(),
    ];

    if (status) {
      strings.splice(3, 0, `${chalk[color](`[${status || 200}]`)}`);
    }

    return strings.join(" ");
  }

  private log({ message, level, owner, status, aligned }: LogProperties) {
    const logText = this.formatMessage(message, level, owner, status, aligned);

    // biome-ignore lint/suspicious/noConsole: we need to use console log for internal logger
    console.log(logText);
  }

  info({ message, owner, status }: Omit<LogProperties, "level">) {
    this.log({ message, level: LogLevel.INFO, owner, status });
  }
  error({ message, owner, status }: Omit<LogProperties, "level">) {
    this.log({ message, level: LogLevel.ERROR, owner, status });
  }
  warn({ message, owner, status }: Omit<LogProperties, "level">) {
    this.log({ message, level: LogLevel.WARN, owner, status });
  }
  debug({ message, owner, status }: Omit<LogProperties, "level">) {
    this.log({ message, level: LogLevel.DEBUG, owner, status });
  }
  success({ message, owner, status }: Omit<LogProperties, "level">) {
    this.log({ message, level: LogLevel.SUCCESS, owner, status });
  }
}

export default new Logger();
