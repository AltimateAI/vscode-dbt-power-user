import { Disposable, window, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { AltimateRequest } from "../altimate";

const validTenantRegex = new RegExp(/^[a-z_][a-z0-9_]*$/);

@provideSingleton(ValidationProvider)
export class ValidationProvider implements Disposable {
  private disposables: Disposable[] = [];
  private currInstanceName: string | undefined;
  private currAPIKey: string | undefined;
  isAuthenticated = false;

  constructor(private altimate: AltimateRequest) {
    const config = this.altimate.getConfig();
    this.currInstanceName = config?.instance;
    this.currAPIKey = config?.key;
    this.disposables.push(
      workspace.onDidChangeConfiguration(
        (e) => {
          if (!e.affectsConfiguration("dbt")) {
            return;
          }
          this.validateCredentials(false);
        },
        this,
        this.disposables,
      ),
    );
  }

  async validateCredentials(silent: boolean) {
    const key = workspace.getConfiguration("dbt").get<string>("altimateAiKey");
    const instance = workspace
      .getConfiguration("dbt")
      .get<string>("altimateInstanceName");

    // only validate when both are set
    if (!key || !instance) {
      this.isAuthenticated = false;
      return;
    }

    // no change in instance and key
    if (instance === this.currInstanceName && key === this.currAPIKey) {
      return;
    }

    this.currInstanceName = instance;
    this.currAPIKey = key;
    let message = "";
    if (!validTenantRegex.exec(instance)) {
      message = "Instance name must not be URL.";
    } else if (key.length !== 32) {
      message = "API key is not valid";
    }
    if (message) {
      this.isAuthenticated = false;
      if (!silent) {
        window.showErrorMessage(message);
      }
      return;
    }
    const validation = await this.altimate.validateCredentials(instance, key);
    if (!validation?.ok) {
      this.isAuthenticated = false;
      if (!silent) {
        window.showErrorMessage(
          `Credentials are invalid. ${validation?.detail}`,
        );
      }
      return;
    }
    this.isAuthenticated = true;
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
