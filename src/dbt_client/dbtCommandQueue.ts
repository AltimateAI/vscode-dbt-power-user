import { CancellationToken, ProgressLocation, window } from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";

interface Command {
  command: (token: CancellationToken) => Promise<void>;
  statusMessage: string;
  focus?: boolean;
}
@provideSingleton(DBTCommandQueue)
export class DBTCommandQueue {
  private queue: Command[] = [];
  private running = false;

  constructor(private telemetry: TelemetryService) {}

  addToQueue(command: Command) {
    this.queue.push(command);
    this.pickCommandToRun();
  }

  private async pickCommandToRun(): Promise<void> {
    if (!this.running && this.queue.length > 0) {
      this.running = true;
      const { command, statusMessage, focus } = this.queue.shift()!;

      await window.withProgress(
        {
          location: focus
            ? ProgressLocation.Notification
            : ProgressLocation.Window,
          cancellable: true,
          title: statusMessage,
        },
        async (_, token) => {
          try {
            await command(token);
          } catch (error) {
            window.showErrorMessage(
              extendErrorWithSupportLinks(
                `Could not run command '${statusMessage}': ` + error,
              ),
            );
            this.telemetry.sendTelemetryError("queueRunCommandError", error, {
              command: statusMessage,
            });
          }
        },
      );

      this.running = false;
      this.pickCommandToRun();
    }
  }
}
