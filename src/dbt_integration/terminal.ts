import { PythonException } from "python-bridge";

export interface DBTTerminal {
  // Terminal display methods
  show(status: boolean): Promise<void>;

  // Logging methods
  log(message: string, ...args: any[]): void;
  trace(message: string): void;
  debug(name: string, message: string, ...args: any[]): void;
  info(
    name: string,
    message: string,
    sendTelemetry?: boolean,
    ...args: any[]
  ): void;
  warn(
    name: string,
    message: string,
    sendTelemetry?: boolean,
    ...args: any[]
  ): void;
  error(
    name: string,
    message: string,
    e: PythonException | Error | unknown,
    sendTelemetry?: boolean,
    ...args: any[]
  ): void;

  // Lifecycle methods
  dispose(): void;
}
