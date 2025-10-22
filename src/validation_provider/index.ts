import {
  ForbiddenError,
  NoCredentialsError,
} from "@altimateai/dbt-integration";
import { commands, Disposable, window, workspace } from "vscode";
import { AltimateRequest } from "../altimate";
import { AltimateAuthService } from "../services/altimateAuthService";

const validTenantRegex = new RegExp(/^[a-z_][a-z0-9_-]*$/);

export class ValidationProvider implements Disposable {
  private disposables: Disposable[] = [];
  private _isAuthenticated = false;
  private cachedConfig = workspace.getConfiguration("dbt");

  constructor(
    private altimate: AltimateRequest,
    private altimateAuthService: AltimateAuthService,
  ) {
    this.disposables.push(
      workspace.onDidChangeConfiguration((e) => {
        if (!e.affectsConfiguration("dbt")) {
          return;
        }
        this.handleConfigurationChange();
      }),
    );
    this.setDBTContext();
  }

  private handleConfigurationChange() {
    const newConfig = workspace.getConfiguration("dbt");
    const oldKey = this.cachedConfig.get<string>("altimateAiKey");
    const newKey = newConfig.get<string>("altimateAiKey");
    const oldInstance = this.cachedConfig.get<string>("altimateInstanceName");
    const newInstance = newConfig.get<string>("altimateInstanceName");
    const oldUrl = this.cachedConfig.get<string>("altimateUrl");
    const newUrl = newConfig.get<string>("altimateUrl");

    const credentialsChanged =
      oldKey !== newKey || oldInstance !== newInstance || oldUrl !== newUrl;

    this.cachedConfig = newConfig;
    this.setDBTContext();

    if (credentialsChanged) {
      this.validateCredentials();
    }
  }

  setDBTContext() {
    let dbtIntegration = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    if (!["core", "cloud"].includes(dbtIntegration)) {
      dbtIntegration = "core";
    }
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.dbtIntegration",
      dbtIntegration,
    );
  }

  validateCredentials() {
    this._validateCredentials(false);
  }

  validateCredentialsSilently() {
    this._validateCredentials(true);
  }

  private async _validateCredentials(silent: boolean) {
    const key = this.altimate.getAIKey();
    const instance = this.altimate.getInstanceName();

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
    const connectivity = await this.altimate.checkApiConnectivity();
    if (connectivity?.status !== "ok") {
      this._isAuthenticated = false;
      if (!silent) {
        window.showErrorMessage(
          "Unable to connect to Altimate Service. Please check your Firewall/VPN settings or check service [status](https://altimateai.instatus.com/).",
        );
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
    if (!silent) {
      window.showInformationMessage(
        "Altimate AI credentials validated successfully.",
      );
    }
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }

  throwIfNotAuthenticated() {
    if (!this.isAuthenticated()) {
      const message = this.altimateAuthService.getCredentialsMessage();
      throw message ? new NoCredentialsError(message) : new ForbiddenError();
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
