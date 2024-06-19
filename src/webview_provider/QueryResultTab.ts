import { ViewColumn, WebviewPanel, window } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryService } from "../telemetry";
import { getFormattedDateTime, provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { UsersService } from "../services/usersService";

@provideSingleton(QueryResultTab)
export class QueryResultTab extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.QueryResultTab";
  protected viewPath = "/query-panel";
  protected panelDescription = "Query Result Tab";
  private _queryTabData: any;

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
      usersService,
    );

    const t = this;
  }

  protected onWebviewReady() {
    super.onWebviewReady();

    if (!this._webview) {
      return;
    }

    this.sendResponseToWebview({
      command: "queryResultTab",
      args: {
        queryResults: this._queryTabData,
      },
    });
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "queryResultTab:render":
        this.dbtTerminal.debug(
          "queryResultTab:render",
          "rendering query result tab",
          payload,
        );
        this._queryTabData = payload.queryTabData;
        const webviewPanel = window.createWebviewPanel(
          QueryResultTab.viewType,
          "query_result_" + getFormattedDateTime(),
          {
            viewColumn: ViewColumn.Active,
          },
          { enableScripts: true, retainContextWhenHidden: true },
        );
        this._panel = webviewPanel;
        this.renderWebview(webviewPanel);

        break;
      default:
        super.onEvent({ command, payload });
        break;
    }
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

  private renderWebview(webview: WebviewPanel) {
    this._webview = webview.webview;
    this.renderWebviewView();
  }

  protected async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    try {
      switch (command) {
        case "getQueryTabData":
          this.sendResponseToWebview({
            command: "response",
            data: this._queryTabData,
            syncRequestId,
          });
        default:
          super.handleCommand(message);
          break;
      }
    } catch (err) {
      this.dbtTerminal.error(
        "queryResultTab:handleCommand",
        "error while handling command",
        err,
      );
    }
  }
}
