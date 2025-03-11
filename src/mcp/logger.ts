import * as fs from "fs";
import * as path from "path";

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LoggerOptions {
  logLevel?: LogLevel;
  logToFile?: boolean;
  logFilePath?: string;
}

/**
 * Logger for the MCP server
 */
export class Logger {
  private logLevel: LogLevel;
  private logToFile: boolean;
  private logFilePath?: string;
  private logContext: string;

  constructor(context: string, options: LoggerOptions = {}) {
    this.logContext = context;

    // Get log level from environment variables or use default
    const envLogLevel = process.env.DBT_MCP_LOG_LEVEL?.toUpperCase();
    let logLevel = options.logLevel ?? LogLevel.INFO;

    if (envLogLevel === "DEBUG") {
      logLevel = LogLevel.DEBUG;
    } else if (envLogLevel === "INFO") {
      logLevel = LogLevel.INFO;
    } else if (envLogLevel === "WARN") {
      logLevel = LogLevel.WARN;
    } else if (envLogLevel === "ERROR") {
      logLevel = LogLevel.ERROR;
    }

    this.logLevel = logLevel;

    // Determine if we should log to file
    this.logToFile =
      options.logToFile ?? process.env.DBT_MCP_LOG_TO_FILE === "true";

    // Set log file path if logging to file
    if (this.logToFile) {
      this.logFilePath =
        options.logFilePath ??
        process.env.DBT_MCP_LOG_FILE_PATH ??
        path.join(process.cwd(), "dbt-mcp-server.log");

      // Ensure log directory exists
      const logDir = path.dirname(this.logFilePath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
    }
  }

  /**
   * Log a debug message
   */
  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  /**
   * Log an info message
   */
  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  /**
   * Log a warning message
   */
  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  /**
   * Log an error message
   */
  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  /**
   * Log a message with the specified level
   */
  private log(level: LogLevel, message: string, ...args: any[]): void {
    // Skip logging if level is below configured level
    if (level < this.logLevel) {
      return;
    }

    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const formattedMessage = `[${timestamp}] [${levelName}] [${this.logContext}] ${message}`;

    // Log to console
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, ...args);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, ...args);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, ...args);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, ...args);
        break;
    }

    // Log to file if enabled
    if (this.logToFile && this.logFilePath) {
      try {
        const argsStr =
          args.length > 0
            ? " " +
              args
                .map((arg) =>
                  typeof arg === "object" ? JSON.stringify(arg) : String(arg),
                )
                .join(" ")
            : "";

        fs.appendFileSync(this.logFilePath, `${formattedMessage}${argsStr}\n`);
      } catch (error) {
        console.error(`Failed to write to log file: ${error}`);
      }
    }
  }
}

/**
 * Create a logger with the given context
 */
export function createLogger(
  context: string,
  options: LoggerOptions = {},
): Logger {
  return new Logger(context, options);
}
