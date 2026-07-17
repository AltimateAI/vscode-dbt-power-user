import { DBTTerminal } from "@altimateai/dbt-integration";
import { inject } from "inversify";
import fetch from "node-fetch";
import { Uri, ViewColumn, WebviewPanel, window, workspace } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { AltimateAuthService } from "../services/altimateAuthService";
import { AltimateCodeChatService } from "../services/altimateCodeChatService";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { TelemetryService } from "../telemetry";
import { TelemetryEvents } from "../telemetry/events";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
} from "./altimateWebviewProvider";

// A single curated changelog file is published by the Comm Center as an
// IDE-specific manifest, filtered to dbt-power-user entries. The webview
// renders directly from this shape; entry links resolve to `base_url + anchor`
// on the website changelog.
interface WhatsNewItem {
  title: string;
  tag: "new" | "improved" | "fix";
  summary: string;
  anchor: string;
}

interface WhatsNewManifest {
  product: string;
  version: string;
  generated_at: string;
  base_url: string;
  items: WhatsNewItem[];
}

// TODO: point at the Comm Center IDE-manifest endpoint once its URL and keying
// (per-version file vs single feed) are finalized. `{version}` is replaced with
// the running extension version. Until then, `dbt.whatsNewManifestUrl` can be
// set to a reachable manifest for local/staging verification.
const WHATS_NEW_MANIFEST_URL =
  "https://www.altimate.ai/changelog/ide-manifest/dbt-power-user/{version}.json";

// globalState keys
const LAST_SEEN_VERSION_KEY = "whatsNew.lastSeenVersion";
const MANIFEST_CACHE_KEY = "whatsNew.cachedManifest";

type WhatsNewTrigger = "auto" | "manual";

export class WhatsNewPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.WhatsNew";
  protected viewPath = "/whats-new";
  protected panelDescription = "What's New in dbt Power User";
  private currentTrigger: WhatsNewTrigger = "manual";

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    @inject("DBTTerminal")
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
    protected altimateAuthService: AltimateAuthService,
    altimateCodeChatService: AltimateCodeChatService,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
      usersService,
      altimateAuthService,
      altimateCodeChatService,
    );
  }

  /**
   * Opens (or focuses) the What's New panel in the editor area. Mirrors VS
   * Code's own Release Notes: a one-off webview in the center, not a sidebar.
   */
  public show(trigger: WhatsNewTrigger): void {
    this.currentTrigger = trigger;

    if (this._panel) {
      (this._panel as WebviewPanel).reveal?.();
      return;
    }

    const webviewPanel = window.createWebviewPanel(
      WhatsNewPanel.viewType,
      "What's New · Power User for dbt",
      { viewColumn: ViewColumn.Active },
      { enableScripts: true, retainContextWhenHidden: true },
    );
    // Use the same logo as the Marketplace listing (package.json `icon`) so the
    // tab reads as the Power User for dbt extension.
    webviewPanel.iconPath = Uri.joinPath(
      this.dbtProjectContainer.extensionUri,
      "media",
      "images",
      "dbt.png",
    );
    this._panel = webviewPanel;

    webviewPanel.onDidDispose(() => {
      this._panel = undefined;
      this._webview = undefined;
      this.isWebviewReady = false;
    });

    this._webview = webviewPanel.webview;
    this.renderWebviewView();
  }

  protected renderWebviewView(): void {
    if (!this._webview) {
      return;
    }
    this._webview.onDidReceiveMessage(this.handleCommand, this, []);
    this._webview.html = this.getHtml(
      this._webview,
      this.dbtProjectContainer.extensionUri,
    );
  }

  /**
   * Auto-open decision, run once on activation (mirrors initializeWalkthrough).
   * Opens only on a minor/major version bump; patch releases stay silent.
   * The current version is always persisted so users are not re-prompted.
   */
  public checkAndShowOnActivation(): void {
    const current = this.dbtProjectContainer.extensionVersion;
    const lastSeen = this.dbtProjectContainer.getFromGlobalState(
      LAST_SEEN_VERSION_KEY,
    ) as string | undefined;

    this.dbtProjectContainer.setToGlobalState(LAST_SEEN_VERSION_KEY, current);

    const enabled = workspace
      .getConfiguration("dbt")
      .get<boolean>("showChangelogOnUpdate", true);
    if (!enabled) {
      return;
    }

    // Fresh install: defer to the setup walkthrough rather than the changelog.
    if (!lastSeen) {
      return;
    }

    if (WhatsNewPanel.isMinorOrMajorUpgrade(lastSeen, current)) {
      this.show("auto");
    }
  }

  private static parseVersion(
    version: string,
  ): [number, number, number] | undefined {
    const match = /^(\d+)\.(\d+)\.(\d+)/.exec(version.trim());
    if (!match) {
      return undefined;
    }
    return [Number(match[1]), Number(match[2]), Number(match[3])];
  }

  static isMinorOrMajorUpgrade(prev: string, curr: string): boolean {
    const p = WhatsNewPanel.parseVersion(prev);
    const c = WhatsNewPanel.parseVersion(curr);
    if (!p || !c) {
      return false;
    }
    if (c[0] !== p[0]) {
      return c[0] > p[0];
    }
    if (c[1] !== p[1]) {
      return c[1] > p[1];
    }
    return false; // same or patch-only change
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId } = message;
    switch (command) {
      case "getWhatsNewManifest":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          () => this.getManifestForWebview(),
          command,
        );
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }

  private async getManifestForWebview(): Promise<WhatsNewManifest> {
    const manifest = await this.fetchManifest();
    this.telemetry.sendTelemetryEvent(
      TelemetryEvents["WhatsNew/PageOpened"],
      { version: manifest.version, trigger: this.currentTrigger },
      { items_shown: manifest.items.length },
    );
    return manifest;
  }

  private async fetchManifest(): Promise<WhatsNewManifest> {
    const version = this.dbtProjectContainer.extensionVersion;
    const override = workspace
      .getConfiguration("dbt")
      .get<string>("whatsNewManifestUrl", "");
    const url = (override || WHATS_NEW_MANIFEST_URL).replace(
      "{version}",
      version,
    );

    this.dbtTerminal.debug(
      "whatsNew:fetchManifest",
      `Fetching What's New manifest from ${url}`,
    );

    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Manifest request failed with ${response.status}`);
      }
      const manifest = (await response.json()) as WhatsNewManifest;
      this.dbtProjectContainer.setToGlobalState(MANIFEST_CACHE_KEY, manifest);
      return manifest;
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      this.dbtTerminal.warn(
        "whatsNew:fetchManifest",
        `Failed to fetch What's New manifest from ${url}: ${detail}`,
      );
      // Offline / endpoint down: fall back to the last successfully fetched
      // manifest so the panel still renders something useful.
      const cached = this.dbtProjectContainer.getFromGlobalState(
        MANIFEST_CACHE_KEY,
      ) as WhatsNewManifest | undefined;
      if (cached) {
        return cached;
      }
      throw error;
    }
  }
}
