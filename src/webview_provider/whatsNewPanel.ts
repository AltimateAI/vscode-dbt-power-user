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

// The panel renders from the public changelog RSS feed, filtered to this
// product's entries and mapped to the shape below.
//
// Tags mirror the changelog source's own vocabulary (altimate-website
// `changelog-taxonomy.js` / the feed generator's VALID_TAGS), so a new tag
// renders instead of silently collapsing into "improved".
type WhatsNewTag = "new" | "improved" | "beta" | "fixed";

const VALID_TAGS: readonly WhatsNewTag[] = ["new", "improved", "beta", "fixed"];
const DEFAULT_TAG: WhatsNewTag = "improved";

interface WhatsNewItem {
  title: string;
  tag: WhatsNewTag;
  summary: string;
  anchor: string;
  // YYYY-MM-DD, derived from the feed's pubDate; drives month grouping.
  date: string;
  // Only present when the changelog entry declares a version for this
  // product; the webview omits the version chip when it's absent.
  version?: string;
}

interface WhatsNewManifest {
  product: string;
  version: string;
  generated_at: string;
  base_url: string;
  items: WhatsNewItem[];
}

// The public changelog RSS feed is the source of truth. Entries carry their
// product as `<category>` and, when known, a per-product version as
// `<altimate:version product="...">`, so the panel can scope itself to this
// product. Overridable via `dbt.whatsNewManifestUrl` for local verification.
const WHATS_NEW_FEED_URL = "https://altimate.ai/changelog.rss.xml";
const CHANGELOG_BASE_URL = "https://altimate.ai/changelog";
const PRODUCT_SLUG = "dbt-power-user";

// globalState keys
const LAST_SEEN_VERSION_KEY = "whatsNew.lastSeenVersion";
const MANIFEST_CACHE_KEY = "whatsNew.cachedManifest";

// ---------------------------------------------------------------------------
// RSS parsing
//
// The feed is generated from a fixed template we control
// (altimate-website `scripts/generate-changelog-rss.cjs`): flat <item> blocks,
// no CDATA, no nested elements inside item children, and text escaped for
// & < > " ' only. That makes targeted extraction sufficient and avoids adding
// an XML parser dependency to the extension bundle. If the feed ever grows
// nested or CDATA content, swap this for a real parser.
// ---------------------------------------------------------------------------

const decodeXml = (value: string): string =>
  value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    // &amp; last, so "&amp;lt;" decodes to "&lt;" and not "<"
    .replace(/&amp;/g, "&");

const firstTagText = (block: string, tag: string): string => {
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`).exec(block);
  return match ? decodeXml(match[1].trim()) : "";
};

/** Product slugs on the entry, from its `<category>` elements. */
const itemProducts = (block: string): string[] =>
  [...block.matchAll(/<category[^>]*>([\s\S]*?)<\/category>/g)].map((m) =>
    decodeXml(m[1].trim()),
  );

/** `<altimate:version product="X">1.2.3</altimate:version>` for this product. */
const itemVersion = (block: string, product: string): string | undefined => {
  for (const m of block.matchAll(
    /<altimate:version\s+product="([^"]*)"\s*>([\s\S]*?)<\/altimate:version>/g,
  )) {
    if (decodeXml(m[1]) === product) {
      return decodeXml(m[2].trim()) || undefined;
    }
  }
  return undefined;
};

/**
 * The feed carries the tag only as a `[Label]` prefix on the title, so split
 * it back out and leave the title clean.
 */
const splitTag = (rawTitle: string): { tag: WhatsNewTag; title: string } => {
  const match = /^\[([^\]]+)\]\s*(.*)$/.exec(rawTitle);
  if (!match) {
    return { tag: DEFAULT_TAG, title: rawTitle };
  }
  const candidate = match[1].trim().toLowerCase() as WhatsNewTag;
  return VALID_TAGS.includes(candidate)
    ? { tag: candidate, title: match[2].trim() }
    : { tag: DEFAULT_TAG, title: rawTitle };
};

/** RFC-822 pubDate -> YYYY-MM-DD (UTC), the shape the webview groups on. */
const toIsoDate = (pubDate: string): string => {
  const parsed = new Date(pubDate);
  return isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
};

/** Anchor (`#slug`) from the entry's link/guid. */
const toAnchor = (link: string): string => {
  const hash = link.indexOf("#");
  return hash >= 0 ? link.slice(hash) : "";
};

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

  /** Map the changelog feed to this product's entries, newest first. */
  private parseFeed(xml: string, extensionVersion: string): WhatsNewManifest {
    const items: WhatsNewItem[] = [];

    for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const block = match[1];
      if (!itemProducts(block).includes(PRODUCT_SLUG)) {
        continue; // another product's entry
      }
      const { tag, title } = splitTag(firstTagText(block, "title"));
      const link = firstTagText(block, "link") || firstTagText(block, "guid");
      const date = toIsoDate(firstTagText(block, "pubDate"));
      if (!title || !date) {
        continue; // malformed entry — skip rather than render a blank row
      }
      items.push({
        title,
        tag,
        summary: firstTagText(block, "description"),
        anchor: toAnchor(link),
        date,
        version: itemVersion(block, PRODUCT_SLUG),
      });
    }

    items.sort((a, b) => b.date.localeCompare(a.date));

    return {
      product: PRODUCT_SLUG,
      version: extensionVersion,
      generated_at:
        firstTagText(xml, "lastBuildDate") || new Date().toUTCString(),
      base_url: CHANGELOG_BASE_URL,
      items,
    };
  }

  private async fetchManifest(): Promise<WhatsNewManifest> {
    const version = this.dbtProjectContainer.extensionVersion;
    const url =
      workspace
        .getConfiguration("dbt")
        .get<string>("whatsNewManifestUrl", "") || WHATS_NEW_FEED_URL;

    this.dbtTerminal.debug(
      "whatsNew:fetchManifest",
      `Fetching What's New feed from ${url}`,
    );

    try {
      const response = await fetch(url, {
        headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      });
      if (!response.ok) {
        throw new Error(`Feed request failed with ${response.status}`);
      }
      const manifest = this.parseFeed(await response.text(), version);
      this.dbtTerminal.debug(
        "whatsNew:fetchManifest",
        `Parsed ${manifest.items.length} ${PRODUCT_SLUG} entries from the feed`,
      );
      this.dbtProjectContainer.setToGlobalState(MANIFEST_CACHE_KEY, manifest);
      return manifest;
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      this.dbtTerminal.warn(
        "whatsNew:fetchManifest",
        `Failed to fetch What's New feed from ${url}: ${detail}`,
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
