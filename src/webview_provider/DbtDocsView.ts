import { WebviewPanel } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";

@provideSingleton(DbtDocsView)
export class DbtDocsView extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.DbtDocs";
  protected viewPath = "/dbt-docs";
  protected panelDescription = "Dbt docs view";

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
    );
  }

  protected renderWebviewView() {
    if (!this._webview) {
      return;
    }

    this._webview.onDidReceiveMessage(this.handleCommand, this, []);

    this._webview.html = this.getHtml(
      this._webview,
      this.dbtProjectContainer.extensionUri,
    );
  }

  public renderWebview(webview: WebviewPanel) {
    this._webview = webview.webview;
    this.renderWebviewView();
  }
}
