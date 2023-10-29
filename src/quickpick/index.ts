import { Disposable, commands } from "vscode";
import { provideSingleton } from "../utils";
import { PuQuickPick } from "./puQuickPick";

@provideSingleton(PUStatusBars)
export class PUStatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(private puLaunchQuickPick: PuQuickPick) {
    commands.registerCommand("dbtPowerUser.puQuickPick", async () => {
      await this.puLaunchQuickPick.openPuQuickPick();
    });
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
