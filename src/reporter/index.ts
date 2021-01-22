import { Disposable } from "vscode";
import TelemetryReporter from "vscode-extension-telemetry";
import { version } from "../../package.json";
import { provideSingleton } from "../utils";

@provideSingleton(Reporter)
export class Reporter implements Disposable {
  private static readonly EXTENSION_ID = "innoverio.vscode-dbt-power-user";
  private static readonly VERSION = version;
  private static readonly KEY = "bffec57c-2d33-44e4-8594-82f2d1ef65ab";
  private reporter = new TelemetryReporter(
    Reporter.EXTENSION_ID,
    Reporter.VERSION,
    Reporter.KEY
  );

  sendEvent(event: string, ...eventProps: any) {
    this.reporter.sendTelemetryEvent(event, eventProps);
  }

  sendException(error: Error, ...eventProps: any) {
    this.reporter.sendTelemetryException(error, eventProps);
  }

  dispose() {
    this.reporter.dispose();
  }
}
