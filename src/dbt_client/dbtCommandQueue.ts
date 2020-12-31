import { DBTClient } from "./dbtClient";

type Command = () => Promise<any>;

interface CommandItem {
  command: Command;
  text: string;
}
export class DBTCommandQueue {
  private queue: CommandItem[] = []; // TODO add WithProgress display
  private currentPromise?: any;
  private dbtClient: DBTClient;

  constructor(dbtClient: DBTClient) {
    this.dbtClient = dbtClient;
  }

  addToQueue(command: Command, text: string) {
    this.queue.push({ command, text });
    this.pickCommandToRun();
  }

  private async pickCommandToRun(): Promise<any> {
    if (this.currentPromise === undefined && this.queue.length > 0) {
      const { command, text } = this.queue.shift()!;

      this.currentPromise = command;
      this.dbtClient.showMessageInStatusBar(text);

      await this.currentPromise(); // TODO if possible when error happens show error and link to its output

      this.currentPromise = undefined;
      this.dbtClient.showVersionInStatusBar();
      this.pickCommandToRun();
    }
  }
}
