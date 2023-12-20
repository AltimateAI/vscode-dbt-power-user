import { Disposable, EventEmitter, Terminal, window } from "vscode";
import {
  extendErrorWithSupportLinks,
  provideSingleton,
  stripANSI,
} from "../utils";
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

  trace(msg: string) {
    this.outputChannel?.appendLine(stripANSI(msg));
    console.log(msg);
  }

  debug(msg: string) {
    this.outputChannel?.debug(stripANSI(msg));
    console.debug(msg);
  }

  info(e: CustomException, sendTelemetry: boolean = false) {
    const errorMessage = e.getErrorMessage();
    this.outputChannel?.info(stripANSI(errorMessage));
    console.info(errorMessage);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryEvent(e.name, e.extra);
    }
  }

  warn(e: CustomException, sendTelemetry: boolean = false) {
    const errorMessage = e.getErrorMessage();
    this.outputChannel?.warn(stripANSI(errorMessage));
    console.warn(errorMessage);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryError(e.name, e.error, e.extra);
    }
  }

  error(e: CustomException, sendTelemetry = false) {
    const errorMessage = e.getErrorMessage();
    this.outputChannel?.error(stripANSI(errorMessage));
    window.showErrorMessage(extendErrorWithSupportLinks(e.message));
    console.error(errorMessage);
    if (sendTelemetry) {
      this.telemetry.sendTelemetryError(e.name, e.error, e.extra);
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
