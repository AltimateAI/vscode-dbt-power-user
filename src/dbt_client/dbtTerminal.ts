import { Disposable, EventEmitter, Terminal, window } from "vscode";
import { provideSingleton, stripANSI } from "../utils";
import { CustomException } from "./exception";
import { TelemetryService } from "../telemetry";

@provideSingleton(DBTTerminal)
export class DBTTerminal {
  private disposables: Disposable[] = [];
  private terminal?: Terminal;
  private readonly writeEmitter = new EventEmitter<string>();
  private outputChannel = window.createOutputChannel(`Log - dbt`, {
    log: true,
  });

  constructor(private telemetry: TelemetryService) {}

  show(status: boolean) {
    if (status) {
      this.requireTerminal();
      this.terminal!.show(!status);
    }
  }

  log(message: string) {
    this.outputChannel.info(stripANSI(message));
    if (this.terminal !== undefined) {
      this.writeEmitter.fire(message);
    }
  }

  trace(message: string) {
    this.outputChannel?.appendLine(stripANSI(message));
    console.log(message);
  }

  debug(message: string) {
    this.outputChannel?.debug(stripANSI(message));
    console.debug(message);
  }

  info(name: string, message: string, sendTelemetry: boolean = true) {
    this.outputChannel?.info(stripANSI(message));
    console.info(`${name}:${message}`);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryEvent(name, { message });
    }
  }

  warn(e: CustomException, sendTelemetry: boolean = true) {
    const message = e.getMessage();
    this.outputChannel?.warn(stripANSI(message));
    console.warn(`${e.name}:${message}`);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryError(e.name, e.error, { message });
    }
  }

  error(e: CustomException, sendTelemetry = true) {
    const message = e.getMessage();
    this.outputChannel?.error(stripANSI(message));
    console.error(`${e.name}:${message}`);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryError(e.name, e.error, { message });
    }
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      x?.dispose();
    }
  }

  private requireTerminal() {
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
    }
  }
}
