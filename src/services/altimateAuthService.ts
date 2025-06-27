import { window, env, Uri } from "vscode";
import { inject } from "inversify";
import { provideSingleton } from "../utils";
import { DBTConfiguration } from "../dbt_integration/configuration";

enum PromptAnswer {
  YES = "Get your free API Key",
}

@provideSingleton(AltimateAuthService)
export class AltimateAuthService {
  constructor(
    @inject("DBTConfiguration")
    private dbtConfiguration: DBTConfiguration,
  ) {}

  /**
   * Checks if user has valid Altimate credentials and shows setup message if not.
   * @returns true if user has valid credentials, false if credentials are missing
   */
  handlePreviewFeatures(): boolean {
    const message = this.getCredentialsMessage();
    if (!message) {
      return true;
    }
    this.showAPIKeyMessage(message);
    return false;
  }

  /**
   * Gets a message describing missing credentials, or undefined if credentials are valid.
   */
  getCredentialsMessage(): string | undefined {
    const key = this.dbtConfiguration.getAltimateAiKey();
    const instance = this.dbtConfiguration.getAltimateInstanceName();

    if (!key && !instance) {
      return `To use this feature, please add an API Key and an instance name in the settings.`;
    }
    if (!key) {
      return `To use this feature, please add an API key in the settings.`;
    }
    if (!instance) {
      return `To use this feature, please add an instance name in the settings.`;
    }
    return;
  }

  /**
   * Checks if the user has valid Altimate credentials.
   */
  isAuthenticated(): boolean {
    const key = this.dbtConfiguration.getAltimateAiKey();
    const instance = this.dbtConfiguration.getAltimateInstanceName();
    return !!(key && instance);
  }

  /**
   * Gets the current Altimate configuration if valid.
   */
  getConfig(): { key: string; instance: string } | undefined {
    const key = this.dbtConfiguration.getAltimateAiKey();
    const instance = this.dbtConfiguration.getAltimateInstanceName();
    if (!key || !instance) {
      return undefined;
    }
    return { key, instance };
  }

  private async showAPIKeyMessage(message: string) {
    const answer = await window.showInformationMessage(
      message,
      PromptAnswer.YES,
    );
    if (answer === PromptAnswer.YES) {
      env.openExternal(
        Uri.parse("https://app.myaltimate.com/register?source=extension"),
      );
    }
  }
}
