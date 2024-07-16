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

@provideSingleton(HomeViewProvider)
export class HomeViewProvider extends AltimateWebviewProvider {
  public static readonly viewType = "poweruser_home_view";
  protected viewPath = "/home-view";
  protected panelDescription = "dbt Power user home view";

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
          if (e.affectsConfiguration("dbt.enableHomeView")) {
            this.updateEnableHomeviewInContext();
            if (this._panel) {
              this.renderWebviewView(this._panel.webview);
            }
          }
        },
        this,
        this._disposables,
      ),
    );
    this.updateEnableHomeviewInContext();
  }

  private updateEnableHomeviewInContext() {
    // Setting this here to access it in package.json for enabling new file command
    commands.executeCommand(
      "setContext",
      "dbt.enableHomeView",
      workspace.getConfiguration("dbt").get<boolean>("enableHomeView", false),
    );
  }
}
