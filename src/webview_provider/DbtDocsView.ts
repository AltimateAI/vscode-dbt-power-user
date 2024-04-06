import { ViewColumn, WebviewPanel, window } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { UsersService } from "../services/usersService";

@provideSingleton(DbtDocsView)
export class DbtDocsView extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.DbtDocs";
  protected viewPath = "/dbt-docs";
  protected panelDescription = "Dbt docs view";
  private _shareId: string | undefined;
  private _conversationGroupId: string | undefined;

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    private usersService: UsersService,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
    );

    const t = this;
    this._disposables.push(
      emitterService.eventEmitter.event((d) =>
        t.onEvent(d as SharedStateEventEmitterProps),
      ),
    );
  }

  protected onWebviewReady() {
    super.onWebviewReady();

    if (!this._webview) {
      return;
    }

    this.sendResponseToWebview({
      command: "dbtDocsShareDetails",
      args: {
        shareId: this._shareId,
        conversationGroupId: this._conversationGroupId,
        userId: this.usersService.user?.id,
      },
    });
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "dbtdocsview:render":
        this.dbtTerminal.debug(
          "dbtdocsview:render",
          "rendering dbt docs view",
          payload,
        );
        this._shareId = payload.shareId as string | undefined;
        this._conversationGroupId = payload.conversationGroupId as
          | string
          | undefined;
        const webview = window.createWebviewPanel(
          DbtDocsView.viewType,
          "Dbt docs",
          {
            viewColumn: ViewColumn.Active,
          },
          { enableScripts: true, retainContextWhenHidden: true },
        );
        this.renderWebview(webview);

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
}
