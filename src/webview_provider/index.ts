import { Disposable, window } from "vscode";
import { DataPilotPanel } from "./datapilotPanel";
import { DocsEditViewPanel } from "./docsEditPanel";
import { InsightsPanel } from "./insightsPanel";
import { LineagePanel } from "./lineagePanel";
import { QueryResultPanel } from "./queryResultPanel";

export class WebviewViewProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private queryResultPanel: QueryResultPanel,
    private docsEditPanel: DocsEditViewPanel,
    private lineagePanel: LineagePanel,
    private dataPilotPanel: DataPilotPanel,
    private insightsPanel: InsightsPanel,
  ) {
    this.disposables.push(
      window.registerWebviewViewProvider(
        QueryResultPanel.viewType,
        this.queryResultPanel,
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
      window.registerWebviewViewProvider(
        DataPilotPanel.viewType,
        this.dataPilotPanel,
        { webviewOptions: { retainContextWhenHidden: true } },
      ),
      window.registerWebviewViewProvider(
        InsightsPanel.viewType,
        this.insightsPanel,
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
