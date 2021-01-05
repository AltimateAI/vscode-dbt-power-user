import { ProgressLocation, window } from "vscode";

interface Command{
  command: () => Promise<void>;
  statusMessage: string;
}
export class DBTCommandQueue {
  private queue: Command[] = [];
  private running = false;

  addToQueue(command: Command) {
    this.queue.push(command);
    this.pickCommandToRun();
  }

  private async pickCommandToRun(): Promise<void> {
    if (!this.running && this.queue.length > 0) {
      this.running = true;
      const { command, statusMessage } = this.queue.shift()!;

      await window.withProgress({
          location: ProgressLocation.Window,
          cancellable: false,
          title: statusMessage,
      }, async () => {
          await command();
      });

      this.running = false;   
      this.pickCommandToRun();
    }
  }
}
