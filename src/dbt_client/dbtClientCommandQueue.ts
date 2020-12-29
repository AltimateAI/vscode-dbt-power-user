import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

type Command = () => Promise<any>;

interface CommandItem {
  command: Command;
  text: string;
}
class DBTClientCommandQueue {
  private queue: CommandItem[] = []; // TODO add WithProgress display
  private currentPromise?: any;

  public addToQueue(command: Command, text: string) {
    this.queue.push({ command, text });
    this.pickCommandToRun();
  }

  private async pickCommandToRun(): Promise<any> {
    if (this.currentPromise === undefined && this.queue.length > 0 && dbtProjectContainer.dbtClient !== undefined) {
      const { dbtClient } = dbtProjectContainer;
      const { command, text } = this.queue.shift()!;

      this.currentPromise = command;
      dbtClient.showMessageInStatusBar(text);

      await this.currentPromise(); // TODO if possible when error happens show error and link to its output

      this.currentPromise = undefined;
      dbtClient.showVersionInStatusBar();
      this.pickCommandToRun();
    }
  }
}

export const dbtClientCommandQueue = new DBTClientCommandQueue();

