import { commands, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";

@provideSingleton(DocsGeneratorPanel)
export class DocsGeneratorPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.DocsGenerator";
  protected viewPath = "/docs-generator";
  protected panelDescription = "Document generator";

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    telemetry: TelemetryService,
  ) {
    super(dbtProjectContainer, telemetry);
  }

  async handleCommand(message: {
    command: string;
    args: Record<string, unknown>;
  }): Promise<void> {
    const { command, args } = message;
    const { id, params } = args;

    switch (command) {
      default:
        super.handleCommand(message);
        break;
    }
  }
}
