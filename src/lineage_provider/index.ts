import { ModelGraphViewPanel } from "./modelGraphViewPanel";
import { Disposable, window } from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(ModelGraphWebviewViewProviders)
export class ModelGraphWebviewViewProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(private graphViewPanel: ModelGraphViewPanel) {
    this.disposables.push(
      window.registerWebviewViewProvider(
        ModelGraphViewPanel.viewType,
        this.graphViewPanel,
        { webviewOptions: { retainContextWhenHidden: true } }
      )
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
