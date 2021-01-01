import { ProgressLocation, window } from "vscode";

type Command = () => Promise<any>;

interface CommandItem {
  command: Command;
  statusMessage: string;
}
export class DBTCommandQueue {
  private queue: CommandItem[] = [];
  private currentCommand?: any;

  addToQueue(command: Command, text: string) {
    this.queue.push({ command, statusMessage: text });
    this.pickCommandToRun();
  }

  private async pickCommandToRun(): Promise<any> {
    if (this.currentCommand === undefined && this.queue.length > 0) {
      const { command, statusMessage } = this.queue.shift()!;
      this.currentCommand = command;

      await window.withProgress({
          location: ProgressLocation.Window,
          cancellable: false,
          title: statusMessage,
      }, async () => {
          await this.currentCommand();
      });

      this.currentCommand = undefined;   
      this.pickCommandToRun();
    }
  }
}
