import { Disposable, window } from "vscode";
import { provideSingleton } from "../utils";
import { QueryResultPanel } from "./queryResultPanel";
import { DocsEditViewPanel } from "./docsEditPanel";
import { LineagePanel } from "./lineagePanel";
import { DataPilotPanel } from "./datapilotPanel";
import { InsightsPanel } from "./insightsPanel";
import { DbtPowerUserViewProvider } from "./dbtPowerUserViewProvider";

@provideSingleton(WebviewViewProviders)
export class WebviewViewProviders implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private queryResultPanel: QueryResultPanel,
    private docsEditPanel: DocsEditViewPanel,
    private lineagePanel: LineagePanel,
    private dataPilotPanel: DataPilotPanel,
    private insightsPanel: InsightsPanel,
    private homeViewProvider: DbtPowerUserViewProvider,
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
      window.registerWebviewViewProvider(
        DbtPowerUserViewProvider.viewType,
        this.homeViewProvider,
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
