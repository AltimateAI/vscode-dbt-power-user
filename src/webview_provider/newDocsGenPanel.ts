import {
  CancellationToken,
  TextEditor,
  WebviewView,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DocGenService } from "../services/docGenService";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { DocsGenPanelView } from "./docsEditPanel";

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
    protected emitterService: SharedStateService,
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry, emitterService);

    this._disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          if (event === undefined) {
            return;
          }
          const tests = await this.docGenService.getTestsData(this.eventMap);
          this._panel?.webview.postMessage({
            command: "renderTests",
            tests,
            project: this.docGenService.getProject()?.getProjectName(),
          });
        },
      ),
    );
  }
  resolveWebview(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    token: CancellationToken,
  ): void {
    super.resolveWebviewView(panel, context, token);
  }

  async handleCommand(message: {
    command: string;
    args: Record<string, unknown>;
  }): Promise<void> {
    const { command, args } = message;

    switch (command) {
      case "enableNewDocsPanel":
        this.toggleDocsPanel(args);
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

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "docgen:insert":
        this._panel!.webview.postMessage({ command, ...payload });
        break;
      case "enableNewDocsPanel":
        this.toggleDocsPanel(payload);
      default:
        break;
    }
  }

  private async toggleDocsPanel({ enable }: Record<string, unknown>) {
    await workspace
      .getConfiguration("dbt")
      .update("enableNewDocsPanel", enable);
    this.telemetry.sendTelemetryEvent(
      enable ? "NewDocsPanelEnabled" : "NewDocsPanelDisabled",
    );
  }
}
