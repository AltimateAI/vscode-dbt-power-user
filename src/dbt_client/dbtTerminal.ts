import { EventEmitter, Terminal, window } from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(DBTTerminal)
export class DBTTerminal {
  private terminal?: Terminal;
  private readonly writeEmitter = new EventEmitter<string>();
  private outputChannel = window.createOutputChannel(`Log - dbt`);

  show(status: boolean) {
    if (status) {
      this.requireTerminal();
      this.terminal!.show(!status);
    }
  }

  log(message: string) {
    this.outputChannel.append(message + "\n\r");
    if (this.terminal !== undefined) {
      this.writeEmitter.fire(message + "\n\r");
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
