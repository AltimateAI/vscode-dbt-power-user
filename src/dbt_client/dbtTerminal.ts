import { Disposable, EventEmitter, Terminal, window } from "vscode";
import { provideSingleton, stripANSI } from "../utils";
import { TelemetryService } from "../telemetry";
import { PythonException } from "python-bridge";
import { MockEventEmitter } from "../test/common";

@provideSingleton(DBTTerminal)
export class DBTTerminal {
  private disposables: Disposable[] = [];
  private terminal?: Terminal;
  private readonly writeEmitter =
    process.env.NODE_ENV === "test"
      ? new MockEventEmitter<string>()
      : new EventEmitter<string>();
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

  logNewLine() {
    this.log("\r\n");
  }

  logLine(line: string) {
    this.log(line);
    this.logNewLine();
  }

  logHorizontalRule() {
    this.logLine(
      "--------------------------------------------------------------------------",
    );
  }

  logBlock(block: string[]) {
    this.logHorizontalRule();
    for (const line of block) {
      if (line) {
        this.logLine(line);
      }
    }
    this.logHorizontalRule();
  }

  logBlockWithHeader(header: string[], block: string[]) {
    this.logHorizontalRule();
    for (const line of header) {
      this.logLine(line);
    }
    this.logHorizontalRule();
    for (const line of block) {
      this.logLine(line);
    }
    this.logHorizontalRule();
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
    let errorMessage = message;
    if (e instanceof PythonException) {
      errorMessage = `${message}:${e.toString()}`;
    } else if (e instanceof Error) {
      errorMessage = `${message}:${e.message}`;
    } else if (e) {
      errorMessage = `${message}:${e}`;
    }
    this.outputChannel?.error(`${name}:${stripANSI(errorMessage)}`, args);
    console.error(`${name}:${errorMessage}`, args);
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
      this.disposables.push(this.terminal);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
