import { DBTTerminal } from "@altimateai/dbt-integration";
import { execFile } from "child_process";
import { randomBytes } from "crypto";
import { inject } from "inversify";
import { promisify } from "util";
import {
  commands,
  ConfigurationTarget,
  Disposable,
  env,
  EventEmitter,
  extensions,
  Uri,
  window,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { TelemetryService } from "../telemetry";

const execFileAsync = promisify(execFile);

const EXTENSION_ID = "innoverio.vscode-dbt-power-user";
const ALTIMATE_CODE_EXTENSION_ID = "altimateai.vscode-altimate-mcp-server";
const CONNECT_CLIENT = "power-user-for-dbt";
const SIGN_UP_URL = "https://app.myaltimate.com/register";
// Enterprise accounts are set up by Altimate and log in on their own instance;
// an instance name on its own is taken to be an enterprise one.
const ENTERPRISE_APP_HOST = "app.getaltimate.com";
// Workspaces are only offered on the freemium deployment, whose SaaS app is
// served per instance at `<instance>.app.myaltimate.com`.
const FREEMIUM_API_HOST = "api.myaltimate.com";
const FREEMIUM_APP_HOST = "app.myaltimate.com";
const APP_HOSTS = [FREEMIUM_APP_HOST, ENTERPRISE_APP_HOST];
// The SaaS app that goes with each Altimate API host.
const APP_HOST_BY_API_HOST: Record<string, string> = {
  [FREEMIUM_API_HOST]: FREEMIUM_APP_HOST,
  "api.getaltimate.com": ENTERPRISE_APP_HOST,
};
const WORKSPACE_HANDOFF_PAGE = "/workspaces/create-and-link";
const TENANT_LABEL_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;
const WORKSPACE_LINKS_KEY = "altimateWorkspaceLinks";
// The editors the SaaS will redirect back to.
const SUPPORTED_URI_SCHEMES = ["vscode", "vscode-insiders", "cursor"];
// How long a browser round trip may take before its `state` is dropped.
const PENDING_TTL_MS = 15 * 60 * 1000;
const GIT_TIMEOUT_MS = 5_000;

export const AUTH_CALLBACK_PATH = "/auth";
export const WORKSPACE_CALLBACK_PATH = "/workspace-bound";
/** The SaaS "Open in VS Code" buttons, which carry a one-time sign-in token. */
export const SETUP_CALLBACK_PATH = "/setup";

export interface AltimateAccount {
  instance: string;
  email?: string;
}

export interface WorkspaceLink {
  projectRoot: string;
  workspaceId: string;
}

export interface ConnectFailure {
  flow: "signIn" | "workspace";
  message: string;
}

/** One-time `state` values for browser round trips, each expiring after a while. */
class PendingStates<T> {
  private entries = new Map<string, { value: T; expires: number }>();

  add(value: T): string {
    const state = randomBytes(16).toString("hex");
    this.entries.set(state, { value, expires: Date.now() + PENDING_TTL_MS });
    return state;
  }

  /** Remove `state` and return its value, if it was pending and unexpired. */
  take(state: string | null): T | undefined {
    if (!state) {
      return undefined;
    }
    const entry = this.entries.get(state);
    this.entries.delete(state);
    return entry && entry.expires >= Date.now() ? entry.value : undefined;
  }

  clear() {
    this.entries.clear();
  }
}

/**
 * Connects the extension to an Altimate account and an Altimate Code
 * workspace through the SaaS browser handoffs. Each flow opens the browser
 * with a one-time `state`, and the SaaS redirects back to the editor's URI
 * handler, which this service verifies before trusting the payload.
 */
export class AltimateConnectService implements Disposable {
  // Several can be pending: "Open again" starts another round trip, and the
  // user may finish in either browser tab.
  private pendingSignIns = new PendingStates<true>();
  private pendingWorkspaces = new PendingStates<string>();
  private readonly _onDidConnectAccount = new EventEmitter<AltimateAccount>();
  readonly onDidConnectAccount = this._onDidConnectAccount.event;
  private readonly _onDidLinkWorkspace = new EventEmitter<WorkspaceLink>();
  readonly onDidLinkWorkspace = this._onDidLinkWorkspace.event;
  private readonly _onDidFailConnect = new EventEmitter<ConnectFailure>();
  readonly onDidFailConnect = this._onDidFailConnect.event;

  constructor(
    private altimateRequest: AltimateRequest,
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {}

  /** Whether the SaaS can redirect back to this editor after a sign-in. */
  supportsBrowserSignIn(): boolean {
    return SUPPORTED_URI_SCHEMES.includes(env.uriScheme);
  }

  /**
   * Open the SaaS sign-up page, or the login page of an existing instance,
   * which signs the editor in when it finishes.
   */
  async startSignIn(instance?: string): Promise<void> {
    const url = instance
      ? new URL("/login", this.instanceAppUrl(instance))
      : new URL(SIGN_UP_URL);
    const state = this.pendingSignIns.add(true);
    url.searchParams.set("client", CONNECT_CLIENT);
    url.searchParams.set("redirect", this.callbackUri(AUTH_CALLBACK_PATH));
    url.searchParams.set("state", state);
    this.telemetry.sendTelemetryEvent("onboardingSignInStarted", {
      mode: instance ? "login" : "signup",
    });
    await env.openExternal(Uri.parse(url.toString(), true));
  }

  /** Whether the workspace handoff is available for the signed-in account. */
  canLinkWorkspace(): boolean {
    return this.supportsBrowserSignIn() && this.workspaceWebUrl() !== undefined;
  }

  /** The signed-in instance's SaaS app, when it is on a known deployment. */
  accountAppUrl(): string | undefined {
    const instance = this.altimateRequest.getInstanceName();
    if (!instance || !TENANT_LABEL_RE.test(instance)) {
      return undefined;
    }
    try {
      const appHost =
        APP_HOST_BY_API_HOST[
          new URL(this.altimateRequest.getAltimateUrl()).host
        ];
      return appHost
        ? `https://${instance.toLowerCase()}.${appHost}`
        : undefined;
    } catch {
      return undefined;
    }
  }

  /** Open the SaaS page that creates a workspace and links it to the project. */
  async startWorkspaceLink(projectRoot: string): Promise<void> {
    const webUrl = this.workspaceWebUrl();
    if (!webUrl) {
      throw new Error("Workspaces are not available for this Altimate account");
    }
    const project = this.findProject(projectRoot);
    const state = this.pendingWorkspaces.add(projectRoot);

    const target = new URL(WORKSPACE_HANDOFF_PAGE, webUrl);
    target.searchParams.set("client", CONNECT_CLIENT);
    target.searchParams.set(
      "redirect",
      this.callbackUri(WORKSPACE_CALLBACK_PATH),
    );
    target.searchParams.set("state", state);
    // Project details go in the fragment so they stay out of server logs.
    const fragment = new URLSearchParams();
    fragment.set("project_name", project.getProjectName());
    fragment.set("project_path", projectRoot);
    const remote = await this.getGitRemote(projectRoot);
    if (remote) {
      fragment.set("project_remote", remote);
    }
    this.telemetry.sendTelemetryEvent("onboardingWorkspaceLinkStarted");
    await env.openExternal(
      Uri.parse(`${target.toString()}#${fragment.toString()}`, true),
    );
  }

  /** The workspace linked to the project for the signed-in instance. */
  getLinkedWorkspaceId(projectRoot: string): string | undefined {
    return this.getWorkspaceLinks()[this.linkKey(projectRoot)];
  }

  /** Open Altimate Code chat with the project's workspace selected. */
  async openAltimateCode(projectRoot?: string): Promise<void> {
    if (!extensions.getExtension(ALTIMATE_CODE_EXTENSION_ID)) {
      await commands.executeCommand(
        "workbench.extensions.search",
        ALTIMATE_CODE_EXTENSION_ID,
      );
      return;
    }
    const workspaceId = projectRoot
      ? this.getLinkedWorkspaceId(projectRoot)
      : undefined;
    if (!workspaceId) {
      await commands.executeCommand("altimate.openChat", {
        showWorkspace: true,
      });
      return;
    }
    // Only Altimate Code's `/chat` link selects a workspace before opening.
    await env.openExternal(
      Uri.parse(
        `${env.uriScheme}://${ALTIMATE_CODE_EXTENSION_ID}/chat?workspaceId=${encodeURIComponent(workspaceId)}`,
        true,
      ),
    );
  }

  async handleUri(uri: Uri): Promise<void> {
    const params = new URLSearchParams(uri.query);
    try {
      if (uri.path === AUTH_CALLBACK_PATH) {
        await this.completeSignIn(params);
      } else if (uri.path === SETUP_CALLBACK_PATH) {
        await this.completeSetupLink(params);
      } else if (uri.path === WORKSPACE_CALLBACK_PATH) {
        await this.completeWorkspaceLink(params);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.dbtTerminal.error(
        "altimateConnect:handleUri",
        `Could not complete ${uri.path}`,
        error,
      );
      this.telemetry.sendTelemetryError("onboardingConnectError", error, {
        path: uri.path,
      });
      this._onDidFailConnect.fire({
        flow: uri.path === WORKSPACE_CALLBACK_PATH ? "workspace" : "signIn",
        message,
      });
      window.showErrorMessage(`Could not connect to Altimate: ${message}`);
    }
  }

  private async completeSignIn(params: URLSearchParams) {
    if (!this.pendingSignIns.take(params.get("state"))) {
      throw new Error(
        "This sign-in link was not started from this window, or it expired. Start sign-in again from the setup wizard.",
      );
    }
    const token = params.get("token");
    const instance = params.get("instance");
    const apiUrl = params.get("url") || "https://api.myaltimate.com";
    if (!token || !instance) {
      throw new Error("The sign-in link is missing the token or instance");
    }
    this.assertInstanceName(instance);
    if (!this.isTrustedApiUrl(apiUrl)) {
      throw new Error(`Refusing to sign in against untrusted host ${apiUrl}`);
    }
    this.pendingSignIns.clear();

    const baseUrl = apiUrl.replace(/\/+$/, "");
    const { apiKey, email } = await this.altimateRequest.exchangeSocialToken(
      baseUrl,
      instance,
      token,
    );
    await this.saveCredentials(baseUrl, apiKey, instance);
    this.telemetry.sendTelemetryEvent("onboardingSignInCompleted");
    this._onDidConnectAccount.fire({ instance, email });
  }

  /**
   * Sign in from a SaaS "Open in VS Code" link, which carries a one-time
   * sign-in token, never the API key. The editor did not start this, so the
   * user confirms the instance and backend before anything is replaced.
   */
  private async completeSetupLink(params: URLSearchParams) {
    const instance = params.get("tenant");
    const token = params.get("token");
    const apiUrl = params.get("apiUrl");
    if (!instance || !token || !apiUrl) {
      throw new Error("The setup link is missing the instance, token or URL");
    }
    this.assertInstanceName(instance);
    if (!this.isTrustedApiUrl(apiUrl)) {
      throw new Error(`Refusing to sign in against untrusted host ${apiUrl}`);
    }
    const current = this.altimateRequest.getInstanceName();
    const replacing =
      !!current && current.toLowerCase() !== instance.toLowerCase();
    const signIn = replacing ? "Replace Sign-In" : "Sign In";
    const answer = await window.showInformationMessage(
      replacing
        ? `Replace Power User for dbt's Altimate sign-in "${current}" with "${instance}"?`
        : `Sign Power User for dbt in to the Altimate instance "${instance}"?`,
      {
        modal: true,
        detail: `Backend: ${new URL(apiUrl).host}\nOnly continue if you opened this link from your own Altimate app.`,
      },
      signIn,
    );
    if (answer !== signIn) {
      return;
    }
    const baseUrl = apiUrl.replace(/\/+$/, "");
    const { apiKey, email } = await this.altimateRequest.exchangeSocialToken(
      baseUrl,
      instance,
      token,
    );
    await this.saveCredentials(baseUrl, apiKey, instance);
    this.telemetry.sendTelemetryEvent("onboardingSetupLinkCompleted");
    this._onDidConnectAccount.fire({ instance, email });
    window.showInformationMessage(
      `Power User for dbt is signed in to ${instance}${email ? ` as ${email}` : ""}.`,
    );
  }

  private async saveCredentials(
    baseUrl: string,
    apiKey: string,
    instance: string,
  ) {
    // Save the URL first so validation triggered by the key change uses it.
    // The Altimate extension reads these settings too.
    const dbtConfig = workspace.getConfiguration("dbt");
    await dbtConfig.update("altimateUrl", baseUrl, ConfigurationTarget.Global);
    await dbtConfig.update("altimateAiKey", apiKey, ConfigurationTarget.Global);
    await dbtConfig.update(
      "altimateInstanceName",
      instance,
      ConfigurationTarget.Global,
    );
  }

  /**
   * The SaaS app for an instance, from what the user typed: an instance name
   * (taken to be enterprise), or an Altimate app URL or host for it.
   */
  private instanceAppUrl(input: string): URL {
    const value = input.trim().toLowerCase();
    if (TENANT_LABEL_RE.test(value)) {
      return new URL(`https://${value}.${ENTERPRISE_APP_HOST}`);
    }
    let host: string;
    try {
      host = new URL(/^https?:\/\//.test(value) ? value : `https://${value}`)
        .hostname;
    } catch {
      throw new Error(`"${input}" is not an instance name or Altimate URL`);
    }
    const [label, ...rest] = host.split(".");
    if (!TENANT_LABEL_RE.test(label) || !APP_HOSTS.includes(rest.join("."))) {
      throw new Error(
        `"${input}" is not an Altimate URL. Use your instance's address, like acme.${ENTERPRISE_APP_HOST}`,
      );
    }
    return new URL(`https://${host}`);
  }

  private async completeWorkspaceLink(params: URLSearchParams) {
    const projectRoot = this.pendingWorkspaces.take(params.get("state"));
    if (!projectRoot) {
      throw new Error(
        "This workspace link was not started from this window, or it expired. Set up the workspace again from the setup wizard.",
      );
    }
    const error = params.get("error");
    if (error) {
      throw new Error(
        error === "cancelled"
          ? "Workspace setup was cancelled"
          : `Workspace setup failed: ${error}`,
      );
    }
    const workspaceId = params.get("workspace_id");
    const tenant = params.get("tenant");
    if (!workspaceId || !/^\d+$/.test(workspaceId)) {
      throw new Error("The workspace link is missing a valid workspace id");
    }
    if (
      tenant?.toLowerCase() !==
      this.altimateRequest.getInstanceName()?.toLowerCase()
    ) {
      throw new Error(
        "The workspace belongs to a different Altimate instance than this editor is signed in to",
      );
    }

    await this.altimateRequest.bindProjectToWorkspace(
      Number(workspaceId),
      await this.getGitRemote(projectRoot),
      projectRoot,
    );
    this.dbtProjectContainer.setToWorkspaceState(WORKSPACE_LINKS_KEY, {
      ...this.getWorkspaceLinks(),
      [this.linkKey(projectRoot)]: workspaceId,
    });
    this.telemetry.sendTelemetryEvent("onboardingWorkspaceLinked");
    this._onDidLinkWorkspace.fire({ projectRoot, workspaceId });
  }

  private assertInstanceName(instance: string) {
    if (!TENANT_LABEL_RE.test(instance)) {
      throw new Error(`"${instance}" is not a valid Altimate instance name`);
    }
  }

  private callbackUri(path: string) {
    return `${env.uriScheme}://${EXTENSION_ID}${path}`;
  }

  // Links belong to an account: a project linked under one instance or
  // backend is not linked under another.
  private linkKey(projectRoot: string) {
    const instance = this.altimateRequest.getInstanceName()?.toLowerCase();
    return `${this.altimateRequest.getAltimateUrl()}|${instance}|${projectRoot}`;
  }

  private workspaceWebUrl(): URL | undefined {
    const instance = this.altimateRequest.getInstanceName();
    if (!instance || !TENANT_LABEL_RE.test(instance)) {
      return undefined;
    }
    try {
      if (
        new URL(this.altimateRequest.getAltimateUrl()).host !==
        FREEMIUM_API_HOST
      ) {
        return undefined;
      }
    } catch {
      return undefined;
    }
    return new URL(`https://${instance.toLowerCase()}.${FREEMIUM_APP_HOST}`);
  }

  /**
   * The one-time token is posted to the callback-supplied API URL, so only
   * HTTPS Altimate hosts or the configured backend are accepted.
   */
  private isTrustedApiUrl(raw: string): boolean {
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      return false;
    }
    try {
      const configured = new URL(this.altimateRequest.getAltimateUrl());
      if (
        configured.protocol === url.protocol &&
        configured.host === url.host
      ) {
        return true;
      }
    } catch {
      // Fall through to the host allow-list.
    }
    const host = url.hostname;
    return (
      url.protocol === "https:" &&
      ["myaltimate.com", "getaltimate.com", "altimate.ai"].some(
        (domain) => host === domain || host.endsWith(`.${domain}`),
      )
    );
  }

  private findProject(projectRoot: string) {
    const project = this.dbtProjectContainer
      .getProjects()
      .find((p) => p.projectRoot.fsPath === projectRoot);
    if (!project) {
      throw new Error(`Project not found: ${projectRoot}`);
    }
    return project;
  }

  private getWorkspaceLinks(): Record<string, string> {
    return (
      this.dbtProjectContainer.getFromWorkspaceState(WORKSPACE_LINKS_KEY) ?? {}
    );
  }

  private async getGitRemote(cwd: string): Promise<string | undefined> {
    try {
      const { stdout } = await execFileAsync(
        "git",
        ["config", "--get", "remote.origin.url"],
        { cwd, timeout: GIT_TIMEOUT_MS },
      );
      return stdout.trim() || undefined;
    } catch {
      return undefined;
    }
  }

  dispose() {
    this._onDidConnectAccount.dispose();
    this._onDidLinkWorkspace.dispose();
    this._onDidFailConnect.dispose();
  }
}
