import {
  CancellationToken,
  WebviewView,
  WebviewViewResolveContext,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DocGenService } from "../services/docGenService";
import { EventEmitterService } from "../services/eventEmitterService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import {
  AltimateWebviewProvider,
  EventEmitterEvent,
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
    protected emitterService: EventEmitterService,
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry, emitterService);
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

  protected async onEvent({ command, payload }: EventEmitterEvent) {
    switch (command) {
      case "docgen:insert":
        this._panel!.webview.postMessage({ command, ...payload });
        break;
      default:
        break;
    }
  }
}
