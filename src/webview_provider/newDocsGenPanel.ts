import {
  CancellationToken,
  TextEditor,
  WebviewView,
  WebviewViewResolveContext,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";
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
    telemetry: TelemetryService,
  ) {
    super(dbtProjectContainer, telemetry);
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
    const { id, params } = args;

    switch (command) {
      case "enableNewDocsPanel":
        await workspace
          .getConfiguration("dbt")
          .update("enableNewDocsPanel", args.enable);
        this.telemetry.sendTelemetryEvent("NewDocsPanelDisabled");
        break;

      default:
        break;
    }
  }
}
