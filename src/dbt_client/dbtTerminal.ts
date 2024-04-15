import { Disposable, EventEmitter, Terminal, window } from "vscode";
import { provideSingleton, stripANSI } from "../utils";
import { TelemetryService } from "../telemetry";
import { PythonException } from "python-bridge";

@provideSingleton(DBTTerminal)
export class DBTTerminal {
  private disposables: Disposable[] = [];
  private terminal?: Terminal;
  private readonly writeEmitter = new EventEmitter<string>();
  private outputChannel = window.createOutputChannel(`Log - dbt`, {
    log: true,
  });

  constructor(private telemetry: TelemetryService) {}

  async show(status: boolean) {
    if (status) {
      await this.requireTerminal();
      this.terminal!.show(!status);
    }
  }

  log(message: string, ...args: any[]) {
    this.outputChannel.info(stripANSI(message), args);
    console.log(stripANSI(message), args);
    if (this.terminal !== undefined) {
      this.writeEmitter.fire(message);
    }
  }

  trace(message: string) {
    this.outputChannel?.appendLine(stripANSI(message));
    console.log(message);
  }

  debug(name: string, message: string, ...args: any[]) {
    this.outputChannel?.debug(`${name}:${stripANSI(message)}`, args);
    console.debug(message, args);
  }

  info(
    name: string,
    message: string,
    sendTelemetry: boolean = true,
    ...args: any[]
  ) {
    this.outputChannel?.info(`${name}:${stripANSI(message)}`, args);
    console.info(`${name}:${message}`, args);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryEvent(name, { message, level: "info" });
    }
  }

  warn(
    name: string,
    message: string,
    sendTelemetry: boolean = true,
    ...args: any[]
  ) {
    this.outputChannel?.warn(`${name}:${stripANSI(message)}`, args);
    console.warn(`${name}:${message}`, args);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryEvent(name, { message, level: "warn" });
    }
  }

  error(
    name: string,
    message: string,
    e: PythonException | Error | unknown,
    sendTelemetry = true,
    ...args: any[]
  ) {
    if (e instanceof PythonException) {
      message += `:${e.exception.message}`;
    } else if (e instanceof Error) {
      message += `:${e.message}`;
    } else {
      message += `:${e}`;
    }
    this.outputChannel?.error(`${name}:${stripANSI(message)}`, args);
    console.error(`${name}:${message}`, args);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryError(name, e, { message });
    }
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      x?.dispose();
    }
  }

  private async requireTerminal() {
    if (this.terminal === undefined) {
      this.terminal = window.createTerminal({
        name: "Tasks - dbt",
        pty: {
          onDidWrite: this.writeEmitter.event,
          open: () => this.writeEmitter.fire(""),
          close: () => {
            this.terminal?.dispose();
            this.terminal = undefined;
          },
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
