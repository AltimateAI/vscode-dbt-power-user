import { commands, Uri, window, workspace } from "vscode";

/**
 * SaaS "client-connect" callback for the onboarding sign-up round trip.
 *
 * The web app redirects the browser to
 * `vscode://innoverio.vscode-dbt-power-user/auth-callback` carrying `state`
 * (the nonce the Get Started page stored before opening the browser), `token`
 * (a one-time login_token), `instance` and `url`. We exchange the token for
 * the API key at `${url}/auth/social/exchange` so the raw credential never
 * rides in the URL. A legacy `key` param is still honoured for older links.
 */

export const CONNECT_STATE_KEY = "onboarding.connectState";
export const DEFAULT_ALTIMATE_URL = "https://api.myaltimate.com";

export type AuthCallbackResult =
  | "connected"
  | "error"
  | "state_mismatch"
  | "sign_in_failed";

export interface AuthCallbackDeps {
  globalState: {
    get<T>(key: string): T | undefined;
    update(key: string, value: unknown): Thenable<void>;
  };
  telemetry: { sendTelemetryError(name: string, error: unknown): void };
  fetchImpl?: typeof fetch;
}

export async function exchangeLoginToken(
  apiUrl: string,
  instance: string,
  token: string,
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const res = await fetchImpl(
    `${apiUrl.replace(/\/+$/, "")}/auth/social/exchange`,
    {
      method: "POST",
      headers: {
        "x-tenant": instance,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    },
  );
  if (!res.ok) {
    throw new Error(`exchange failed (${res.status} ${res.statusText})`);
  }
  const data = (await res.json()) as { auth_token?: string };
  if (!data.auth_token) {
    throw new Error("exchange did not return a credential");
  }
  return data.auth_token;
}

export async function handleAltimateAuthCallback(
  uri: Pick<Uri, "query">,
  deps: AuthCallbackDeps,
): Promise<AuthCallbackResult> {
  const params = new URLSearchParams(uri.query);
  const instance = params.get("instance") ?? "";
  const token = params.get("token") ?? "";
  const legacyKey = params.get("key") ?? "";
  const url = params.get("url") ?? "";
  const state = params.get("state") ?? "";
  const errorParam = params.get("error") ?? "";

  if (errorParam) {
    window.showErrorMessage(`Altimate sign-in did not finish: ${errorParam}`);
    return "sign_in_failed";
  }

  const expectedState = deps.globalState.get<string>(CONNECT_STATE_KEY);
  if (expectedState && state && state !== expectedState) {
    window.showErrorMessage(
      "Altimate sign-in callback did not match this VS Code session. Please try again from the Get Started page.",
    );
    return "state_mismatch";
  }

  const dbtConfig = workspace.getConfiguration("dbt");
  const apiUrl =
    url || dbtConfig.get<string>("altimateUrl") || DEFAULT_ALTIMATE_URL;
  try {
    let key = legacyKey;
    if (!key && token && instance) {
      key = await exchangeLoginToken(apiUrl, instance, token, deps.fetchImpl);
    }
    if (!instance || !key) {
      throw new Error("callback did not include a credential");
    }
    if (url) {
      await dbtConfig.update("altimateUrl", url, true);
    }
    await dbtConfig.update("altimateAiKey", key, true);
    await dbtConfig.update("altimateInstanceName", instance, true);
    await deps.globalState.update(CONNECT_STATE_KEY, undefined);
    await commands.executeCommand("dbtPowerUser.openOnboarding");
    return "connected";
  } catch (e) {
    deps.telemetry.sendTelemetryError("altimateAuthCallbackError", e);
    window.showErrorMessage(
      `Could not connect your Altimate account: ${
        e instanceof Error ? e.message : String(e)
      }. You can paste the instance name and API key on the Get Started page instead.`,
    );
    return "error";
  }
}
