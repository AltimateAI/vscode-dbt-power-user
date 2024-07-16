import { commands, workspace } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";

@provideSingleton(DbtPowerUserViewProvider)
export class DbtPowerUserViewProvider extends AltimateWebviewProvider {
  public static readonly viewType = "dbt_poweruser_view";
  protected viewPath = "/dbtPowerUser-view";
  protected panelDescription = "";

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

    this._disposables.push(
      workspace.onDidChangeConfiguration(
        (e) => {
          if (e.affectsConfiguration("dbt.enableNewDbtPoweruserView")) {
            this.updateEnableNewDbtPoweruserViewInContext();
            if (this._panel) {
              this.renderWebviewView(this._panel.webview);
            }
          }
        },
        this,
        this._disposables,
      ),
    );
    this.updateEnableNewDbtPoweruserViewInContext();
  }

  private updateEnableNewDbtPoweruserViewInContext() {
    // Setting this here to access it in package.json for enabling new file command
    commands.executeCommand(
      "setContext",
      "dbt.enableNewDbtPoweruserView",
      workspace
        .getConfiguration("dbt")
        .get<boolean>("enableNewDbtPoweruserView", false),
    );
  }
}
