import { workspace, window } from "vscode";
import { provideSingleton } from "./utils";
import fetch from "node-fetch";

interface AltimateConfig {
  key: string;
  instance: string;
}

class AltimateRequestError extends Error {}

class AltimateRequestUnauthenticatedError extends AltimateRequestError {
  constructor() {
    super("Unauthenticated");
  }
}

class AltimateRequestUnsuccesfullError extends AltimateRequestError {
  constructor(errorCode: number) {
    super(`Request is unsuccesfull : ${errorCode}`);
  }
}

class AltimateRequestTimeoutError extends AltimateRequestError {
  constructor() {
    super("Request timed out");
  }
}

@provideSingleton(AltimateRequest)
export class AltimateRequest {
  private static ALTIMATE_URL = "https://api.tryaltimate.com";

  private getConfig(): AltimateConfig | undefined {
    const key = workspace.getConfiguration("dbt").get<string>("altimateAiKey");
    const instance = workspace
      .getConfiguration("dbt")
      .get<string>("altimateInstanceName");

    if (key && instance) {
      return { key, instance };
    }
    return undefined;
  }

  async fetch<T>(endpoint: string, fetchArgs = {}, timeout: number = 25000) {
    const abortController = new AbortController();
    const timeoutHandler = setTimeout(() => {
      abortController.abort();
    }, timeout);

    const config = this.getConfig();
    if (config === undefined) {
      window.showErrorMessage(
        "This is an Altimate freemium feature. Please sign up for a free Altimate account to use this.",
      );
      return;
    }

    let response;
    try {
      response = await fetch(`${AltimateRequest.ALTIMATE_URL}/${endpoint}`, {
        method: "GET",
        ...fetchArgs,
        signal: abortController.signal,
        headers: {
          "x-tenant": config.instance,
          Authorization: "Bearer " + config.key,
        },
      });
      if (response.status === 401) {
        throw new AltimateRequestUnauthenticatedError();
      }
      if (response.status !== 200) {
        throw new AltimateRequestUnsuccesfullError(response.status);
      }
    } catch (e) {
      clearTimeout(timeoutHandler);
      throw e;
    }
    clearTimeout(timeoutHandler);
    return (await response.json()) as T;
  }

  async isAuthenticated() {
    try {
      await this.fetch<void>("auth_health", {
        method: "POST",
      });
    } catch (error) {
      return false;
    }
    return true;
  }
}
