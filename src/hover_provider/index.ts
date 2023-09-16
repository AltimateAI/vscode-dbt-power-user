import { Disposable, languages } from "vscode";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { provideSingleton } from "../utils";
import { ModelHoverProvider } from "./modelHoverProvider";

@provideSingleton(HoverProviders)
export class HoverProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(private modelHoverProvider: ModelHoverProvider) {
    this.disposables.push(
      languages.registerHoverProvider(
        DBTPowerUserExtension.DBT_SQL_SELECTOR,
        this.modelHoverProvider,
      ),
    );
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
