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
// product.
const WHATS_NEW_FEED_URL = "https://altimate.ai/changelog.rss.xml";
// Bound the feed fetch so a stalled endpoint can't hang the panel — on timeout
// we abort and fall back to the cached manifest.
const FEED_FETCH_TIMEOUT_MS = 10_000;
const CHANGELOG_BASE_URL =
  "https://altimate.ai/changelog?utm_source=dbt-power-user&utm_medium=extension";
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

/**
 * Why a feed fetch failed, as a small closed set for telemetry. The message
 * itself stays out of the event: it is per-machine network detail (proxy
 * hosts, DNS names) that cannot be acted on in aggregate, and the class is
 * what tells a client-side problem (timeouts) from the user's network
 * (blocked, offline, intercepted TLS).
 */
export const feedFailureReason = (error: unknown): string => {
  const err = error as
    | {
        name?: string;
        message?: string;
        cause?: { code?: string; message?: string };
      }
    | undefined;
  if (err?.name === "AbortError") {
    return "timeout";
  }
  const text = [err?.message, err?.cause?.code, err?.cause?.message]
    .filter(Boolean)
    .join(" ");
  const status = /Feed request failed with (\d{3})/.exec(text);
  if (status) {
    return `http_${status[1]}`;
  }
  if (/getaddrinfo|ENOTFOUND|EAI_AGAIN/i.test(text)) {
    return "dns";
  }
  if (/certificate|CERT_|SELF_SIGNED|UNABLE_TO_VERIFY/i.test(text)) {
    return "tls";
  }
  // VS Code's proxy layer ("Failed to establish a socket connection to
  // proxies: PROXY host:port") and a proxy refusing the CONNECT tunnel
  // ("tunneling socket could not be established, statusCode=407").
  if (/\bprox(y|ies)\b|tunneling socket/i.test(text)) {
    return "proxy";
  }
  if (
    /ECONN|EHOSTUNREACH|ENETUNREACH|ETIMEDOUT|EPIPE|socket hang up|network socket|fetch failed/i.test(
      text,
    )
  ) {
    return "network";
  }
  return "other";
};

export class WhatsNewPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.WhatsNew";
  protected viewPath = "/whats-new";
  protected panelDescription = "What's New in dbt Power User";
  private currentTrigger: WhatsNewTrigger = "manual";
  /**
   * The fetch started for an automatic open. The page's own request awaits
   * it instead of fetching again, whether the page was opened by that
   * automatic trigger or by the user in the meantime.
   */
  private pending: Promise<WhatsNewManifest> | undefined;
  /**
   * Set once a page's request has taken `pending`. That page was opened by
   * the user, and it stays theirs even if they close it before the fetch
   * settles: the automatic open must not bring it back.
   */
  private pendingTaken = false;
  /**
   * Set when the user opens the page while the activation fetch is in
   * flight. The automatic open then stands down whatever becomes of that
   * page: its request takes the fetch, or they closed it before it loaded.
   */
  private userOpenedMeanwhile = false;

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
    this.noteOpen(trigger);

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

    webviewPanel.onDidDispose(() => this.onPanelDisposed());

    this._webview = webviewPanel.webview;
    this.renderWebviewView();
  }

  /** The open decision's bookkeeping, separate from the webview plumbing. */
  private noteOpen(trigger: WhatsNewTrigger): void {
    this.currentTrigger = trigger;
    if (trigger === "manual" && this.pending !== undefined) {
      this.userOpenedMeanwhile = true;
    }
    this.dbtTerminal.debug(
      "whatsNew:show",
      `Opening the What's New page (trigger=${trigger})`,
    );
  }

  private onPanelDisposed(): void {
    this._panel = undefined;
    this._webview = undefined;
    this.isWebviewReady = false;
    // A page closed before it asked for the manifest leaves nothing to serve
    // it to; a later open fetches afresh rather than reading a stale one.
    if (!this.pendingTaken) {
      this.pending = undefined;
    }
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
   * The returned promise settles once the open decision is final; it never
   * rejects.
   */
  public async checkAndShowOnActivation(): Promise<void> {
    try {
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

      // Fresh install: defer to the setup walkthrough rather than the
      // changelog.
      if (!lastSeen) {
        return;
      }

      if (WhatsNewPanel.isMinorOrMajorUpgrade(lastSeen, current)) {
        await this.showWhenFeedAvailable();
      }
    } catch (error) {
      // Nothing awaits this at activation; a failure here is ours to log.
      this.dbtTerminal.error(
        "whatsNew:checkAndShowOnActivation",
        "What's New activation check failed",
        error,
      );
    }
  }

  /**
   * An automatic open waits for the manifest: a user upgrading into the panel
   * on a network that blocks the feed must not meet an error page as the first
   * thing after the update. The fetched manifest is kept so the page does not
   * fetch a second time once it loads.
   */
  private async showWhenFeedAvailable(): Promise<void> {
    const fetch = this.fetchManifest("auto");
    this.pending = fetch;
    this.pendingTaken = false;
    this.userOpenedMeanwhile = false;
    let fetched = false;
    try {
      await fetch;
      fetched = true;
    } catch {
      // fetchManifest has logged the failure and reported its reason.
    }
    // A failed fetch is never replayed to a later open. A successful one is
    // kept for the page that will ask for it: the one opened below, or one
    // the user opened meanwhile that is still loading (a page that already
    // took it has cleared it itself).
    if (this.pending === fetch && !fetched) {
      this.pending = undefined;
    }
    // The user opened the page while the fetch was in flight (whatever became
    // of it since), or a page is open for another reason: nothing to open on
    // top.
    if (!fetched || this.userOpenedMeanwhile || this._panel !== undefined) {
      return;
    }
    try {
      this.show("auto");
    } catch (error) {
      this.pending = undefined;
      throw error;
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
        void this.serveManifest(syncRequestId);
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }

  /**
   * Answers the page's manifest request. Handled here rather than through
   * handleSyncRequestFromWebview because an unreachable feed is the network's
   * condition, not a failure of ours: fetchManifest reports it as
   * feed-unavailable, and the page renders its offline state from the failed
   * response.
   */
  private async serveManifest(
    syncRequestId: string | undefined,
  ): Promise<void> {
    let manifest: WhatsNewManifest;
    const shared = this.pending;
    if (shared) {
      this.pendingTaken = true;
    }
    try {
      manifest = await (shared ?? this.fetchManifest(this.currentTrigger));
    } catch (error) {
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        error: error instanceof Error ? error.message : String(error),
        status: false,
      });
      return;
    } finally {
      if (shared && this.pending === shared) {
        this.pending = undefined;
        this.pendingTaken = false;
      }
    }
    this.dbtTerminal.debug(
      "whatsNew:serveManifest",
      `Serving ${manifest.items.length} entries to the page (${shared ? "fetched before opening" : "fetched on request"})`,
    );
    this.telemetry.sendTelemetryEvent(
      TelemetryEvents["WhatsNew/PageOpened"],
      // The running version, not the manifest's: a cached manifest carries
      // the version it was fetched under.
      {
        version: this.dbtProjectContainer.extensionVersion,
        trigger: this.currentTrigger,
      },
      { items_shown: manifest.items.length },
    );
    this.sendResponseToWebview({
      command: "response",
      syncRequestId,
      status: true,
      data: manifest,
    });
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

  private async fetchManifest(
    trigger: WhatsNewTrigger,
  ): Promise<WhatsNewManifest> {
    const version = this.dbtProjectContainer.extensionVersion;
    const url = WHATS_NEW_FEED_URL;

    this.dbtTerminal.debug(
      "whatsNew:fetchManifest",
      `Fetching What's New feed from ${url}`,
    );

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FEED_FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/rss+xml, application/xml, text/xml" },
        signal: controller.signal,
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
      const reason = feedFailureReason(error);
      // Offline / blocked / endpoint down: fall back to the last successfully
      // fetched manifest so the panel still renders something useful.
      const cached = this.dbtProjectContainer.getFromGlobalState(
        MANIFEST_CACHE_KEY,
      ) as WhatsNewManifest | undefined;
      this.dbtTerminal.warn(
        "whatsNew:fetchManifest",
        `Failed to fetch What's New feed from ${url} (${reason}): ${detail}` +
          (cached ? "; showing the cached manifest" : ""),
      );
      this.telemetry.sendTelemetryEvent(
        TelemetryEvents["WhatsNew/FeedUnavailable"],
        { reason, trigger, fallback: cached ? "cache" : "none" },
      );
      if (cached) {
        return cached;
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
