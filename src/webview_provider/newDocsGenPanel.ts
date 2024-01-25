import {
  CancellationToken,
  TextEditor,
  WebviewView,
  WebviewViewResolveContext,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DocGenService } from "../services/docGenService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";
import { DocsGenPanelView } from "./docsEditPanel";
import { sharedStateManager } from "./sharedStateManager";

@provideSingleton(NewDocsGenPanel)
export class NewDocsGenPanel
  extends AltimateWebviewProvider
  implements DocsGenPanelView
{
  public static readonly viewType = "dbtPowerUser.DocsEdit";
  protected viewPath = "/docs-generator";
  protected panelDescription = "Generate documentation for your models";

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    telemetry: TelemetryService,
    private docGenService: DocGenService,
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry);
  }
  resolveWebview(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    token: CancellationToken,
  ): void {
    super.resolveWebviewView(panel, context, token);
    sharedStateManager.addListener((message) => {
      const { command, ...item } = message;
      if (!this._panel) {
        return;
      }
      if (command === "docgen:insert") {
        this._panel.webview.postMessage(message);
      }
    });
  }

  async handleCommand(message: {
    command: string;
    args: Record<string, unknown>;
  }): Promise<void> {
    const { command, args } = message;

    switch (command) {
      case "enableNewDocsPanel":
        await workspace
          .getConfiguration("dbt")
          .update("enableNewDocsPanel", args.enable);
        this.telemetry.sendTelemetryEvent("NewDocsPanelDisabled");
        break;
      case "getCurrentModelDocumentation":
        if (!this.eventMap || !this._panel) {
          return;
        }

        const documentation = await this.docGenService.getDocumentation(
          this.eventMap,
        );
        await this._panel.webview.postMessage({
          command: "renderDocumentation",
          docs: documentation,
          project: this.docGenService.getProject()?.getProjectName(),
        });
      default:
        super.handleCommand(message);
        break;
    }
  }
}
