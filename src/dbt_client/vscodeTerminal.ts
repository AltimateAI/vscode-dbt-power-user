import { DBTTerminal, PythonException } from "@altimateai/dbt-integration";
import { injectable } from "inversify";
import { Disposable, EventEmitter, Terminal, window } from "vscode";
import { dbtErrorReport, TelemetryService } from "../telemetry";
import { stripANSI } from "../utils";

@injectable()
export class VSCodeDBTTerminal implements DBTTerminal {
  private disposables: Disposable[] = [];
  private terminal?: Terminal;
  private readonly writeEmitter = new EventEmitter<string>();
  private readonly closeEmitter = new EventEmitter<void>();
  /** Fires when the user closes "Tasks - dbt", as with Kill Terminal. */
  readonly onDidClose = this.closeEmitter.event;
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
      // dbt-integration passes what dbt Fusion reported (codes, error count)
      // as the first extra argument of some warnings.
      const report = dbtErrorReport(args[0]);
      this.telemetry.sendTelemetryEvent(
        name,
        { message, level: "warn", ...report.properties },
        report.measurements,
      );
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
            this.closeEmitter.fire();
          },
        },
      });
      this.disposables.push(this.terminal);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
