import { Disposable, window, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { AltimateRequest } from "../altimate";

const validTenantRegex = new RegExp(/^[a-z_][a-z0-9_]*$/);

@provideSingleton(ValidationProvider)
export class ValidationProvider implements Disposable {
  private disposables: Disposable[] = [];
  private _isAuthenticated = false;

  constructor(private altimate: AltimateRequest) {
    this.disposables.push(
      workspace.onDidChangeConfiguration((e) => {
        if (!e.affectsConfiguration("dbt")) {
          return;
        }
        this.validateCredentials();
      }),
    );
  }

  validateCredentials() {
    this._validateCredentials(false);
  }

  validateCredentialsSilently() {
    this._validateCredentials(true);
  }

  private async _validateCredentials(silent: boolean) {
    const key = workspace.getConfiguration("dbt").get<string>("altimateAiKey");
    const instance = workspace
      .getConfiguration("dbt")
      .get<string>("altimateInstanceName");

    // only validate when both are set
    if (!key || !instance) {
      this._isAuthenticated = false;
      return;
    }

    let message = "";
    if (!validTenantRegex.exec(instance)) {
      message = "Instance name must not be URL.";
    } else if (key.length !== 32) {
      message = "API key is not valid";
    }
    if (message) {
      this._isAuthenticated = false;
      if (!silent) {
        window.showErrorMessage(message);
      }
      return;
    }
    const validation = await this.altimate.validateCredentials(instance, key);
    if (!validation?.ok) {
      this._isAuthenticated = false;
      if (!silent) {
        window.showErrorMessage(
          `Credentials are invalid. ${validation?.detail}`,
        );
      }
      return;
    }
    this._isAuthenticated = true;
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }

  throwIfNotAuthenticated() {
    if (!this.isAuthenticated()) {
      const message =
        this.altimate.getCredentialsMessage() ||
        "To use this feature, please add a valid API Key and an instance name in the settings.";
      throw new Error(message);
    }
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
