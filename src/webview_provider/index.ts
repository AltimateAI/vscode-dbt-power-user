import { Disposable, window } from "vscode";
import { provideSingleton } from "../utils";
import { QueryResultPanel } from "./queryResultPanel";
import { ModelGraphViewPanel } from "./modelGraphViewPanel";
import { DocsEditViewPanel } from "./docsEditPanel";
import { LineagePanel } from "./lineagePanel";

@provideSingleton(WebviewViewProviders)
export class WebviewViewProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private queryResultPanel: QueryResultPanel,
    private graphViewPanel: ModelGraphViewPanel,
    private docsEditPanel: DocsEditViewPanel,
    private lineagePanel: LineagePanel,
  ) {
    this.disposables.push(
      window.registerWebviewViewProvider(
        QueryResultPanel.viewType,
        this.queryResultPanel,
        { webviewOptions: { retainContextWhenHidden: true } },
      ),
      window.registerWebviewViewProvider(
        ModelGraphViewPanel.viewType,
        this.graphViewPanel,
        { webviewOptions: { retainContextWhenHidden: true } },
      ),
      window.registerWebviewViewProvider(
        DocsEditViewPanel.viewType,
        this.docsEditPanel,
        { webviewOptions: { retainContextWhenHidden: true } },
      ),
      window.registerWebviewViewProvider(
        LineagePanel.viewType,
        this.lineagePanel,
        { webviewOptions: { retainContextWhenHidden: true } },
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
