import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import fetch from "node-fetch";
import {
  WhatsNewPanel,
  feedFailureReason,
} from "../../webview_provider/whatsNewPanel";

const MANIFEST_CACHE_KEY = "whatsNew.cachedManifest";

const FEED = `<?xml version="1.0"?><rss><channel>
<lastBuildDate>Tue, 14 Oct 2026 10:00:00 GMT</lastBuildDate>
<item><title>[Feature] Fetch before opening</title><category>dbt-power-user</category>
<link>https://altimate.ai/changelog#fetch</link><pubDate>Mon, 13 Oct 2026 10:00:00 GMT</pubDate>
<description>desc</description></item>
</channel></rss>`;

/**
 * Builds the panel with only the collaborators the manifest path touches;
 * node-fetch is the jest-mapped mock, so every network outcome can be
 * replayed. The response the page receives is captured through
 * sendResponseToWebview.
 */
const manifestHarness = (opts: { trigger?: "auto" | "manual" } = {}) => {
  const store = new Map<string, unknown>();
  const responses: Record<string, unknown>[] = [];
  const telemetry = {
    sendTelemetryEvent: jest.fn(),
    sendTelemetryError: jest.fn(),
  };
  const dbtTerminal = { debug: jest.fn(), warn: jest.fn(), error: jest.fn() };
  const panel = Object.create(WhatsNewPanel.prototype) as Record<
    string,
    unknown
  > & {
    serveManifest: (id: string) => Promise<void>;
    fetchManifest: (trigger: "auto" | "manual") => Promise<unknown>;
  };
  panel.dbtProjectContainer = {
    extensionVersion: "0.66.0",
    getFromGlobalState: (key: string) => store.get(key),
    setToGlobalState: (key: string, value: unknown): void => {
      store.set(key, value);
    },
  };
  panel.telemetry = telemetry;
  panel.dbtTerminal = dbtTerminal;
  panel.currentTrigger = opts.trigger ?? "manual";
  panel.sendResponseToWebview = (r: Record<string, unknown>) => {
    responses.push(r);
  };
  return { panel, store, responses, telemetry, dbtTerminal };
};

// jest.config.js maps node-fetch to src/test/mock/node-fetch.ts (a jest.fn).
const fetchMock = fetch as unknown as jest.Mock<
  (...args: unknown[]) => Promise<unknown>
>;
const okFeed = () =>
  fetchMock.mockResolvedValue({
    ok: true,
    status: 200,
    text: async () => FEED,
  });
const httpStatus = (status: number) =>
  fetchMock.mockResolvedValue({ ok: false, status, text: async () => "" });
const networkDown = () =>
  fetchMock.mockRejectedValue(
    Object.assign(new TypeError("fetch failed"), {
      cause: { code: "ECONNREFUSED" },
    }),
  );

describe("feedFailureReason", () => {
  it.each([
    [
      Object.assign(new Error("This operation was aborted"), {
        name: "AbortError",
      }),
      "timeout",
    ],
    [new Error("Feed request failed with 403"), "http_403"],
    [new Error("Feed request failed with 503"), "http_503"],
    [
      new Error(
        "request to https://x failed, reason: getaddrinfo ENOTFOUND altimate.ai",
      ),
      "dns",
    ],
    [
      new Error(
        "request to https://x failed, reason: unable to verify the first certificate",
      ),
      "tls",
    ],
    [
      Object.assign(new TypeError("fetch failed"), {
        cause: { code: "SELF_SIGNED_CERT_IN_CHAIN" },
      }),
      "tls",
    ],
    [
      new Error("request to https://x failed, reason: read ECONNRESET"),
      "network",
    ],
    [
      new Error(
        "request to https://x failed, reason: Failed to establish a socket connection to proxies: PROXY 10.0.0.1:8080",
      ),
      "proxy",
    ],
    [
      new Error("tunneling socket could not be established, statusCode=407"),
      "proxy",
    ],
    [
      Object.assign(new TypeError("fetch failed"), {
        cause: { code: "ECONNREFUSED" },
      }),
      "network",
    ],
    [
      new Error(
        "Client network socket disconnected before secure TLS connection was established",
      ),
      "network",
    ],
    [new Error("something else entirely"), "other"],
    ["not even an error", "other"],
  ])("%s -> %s", (error, reason) => {
    expect(feedFailureReason(error)).toBe(reason);
  });
});

describe("WhatsNewPanel manifest path", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("serves a fetched manifest, caches it and reports the page open", async () => {
    okFeed();
    const h = manifestHarness({ trigger: "manual" });

    await h.panel.serveManifest("req-1");

    expect(h.responses).toHaveLength(1);
    expect(h.responses[0]).toMatchObject({
      syncRequestId: "req-1",
      status: true,
    });
    const data = h.responses[0].data as { items: unknown[]; version: string };
    expect(data.items).toHaveLength(1);
    expect(data.version).toBe("0.66.0");
    expect(h.store.get(MANIFEST_CACHE_KEY)).toBe(data);
    expect(h.telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "whats_new_page_opened",
      { version: "0.66.0", trigger: "manual" },
      { items_shown: 1 },
    );
    expect(h.dbtTerminal.warn).not.toHaveBeenCalled();
  });

  it("answers a blocked feed with a failed response and a feed-unavailable event, not an error", async () => {
    httpStatus(403);
    const h = manifestHarness({ trigger: "manual" });

    await h.panel.serveManifest("req-2");

    expect(h.responses[0]).toMatchObject({
      syncRequestId: "req-2",
      status: false,
      error: "Feed request failed with 403",
    });
    expect(h.telemetry.sendTelemetryEvent).toHaveBeenCalledTimes(1);
    expect(h.telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "whats_new_feed_unavailable",
      { reason: "http_403", trigger: "manual", fallback: "none" },
    );
    expect(h.telemetry.sendTelemetryError).not.toHaveBeenCalled();
    expect(h.dbtTerminal.error).not.toHaveBeenCalled();
    expect(h.dbtTerminal.warn).toHaveBeenCalledTimes(1);
    expect(String(h.dbtTerminal.warn.mock.calls[0][1])).toContain("(http_403)");
  });

  it("falls back to the cached manifest when the network is down, and reports the running version", async () => {
    networkDown();
    const h = manifestHarness({ trigger: "auto" });
    const cached = {
      product: "dbt-power-user",
      version: "0.65.0",
      items: [{ title: "old" }],
    };
    h.store.set(MANIFEST_CACHE_KEY, cached);

    await h.panel.serveManifest("req-3");

    expect(h.responses[0]).toMatchObject({ status: true, data: cached });
    expect(h.telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "whats_new_feed_unavailable",
      { reason: "network", trigger: "auto", fallback: "cache" },
    );
    expect(h.telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "whats_new_page_opened",
      { version: "0.66.0", trigger: "auto" },
      { items_shown: 1 },
    );
    expect(String(h.dbtTerminal.warn.mock.calls[0][1])).toContain(
      "showing the cached manifest",
    );
  });

  it("serves the manifest fetched before an automatic open without fetching again", async () => {
    const h = manifestHarness({ trigger: "auto" });
    const preloaded = {
      product: "dbt-power-user",
      version: "0.66.0",
      items: [],
    };
    h.panel.pending = Promise.resolve(preloaded);

    await h.panel.serveManifest("req-4");

    expect(fetchMock).not.toHaveBeenCalled();
    expect(h.responses[0]).toMatchObject({ status: true, data: preloaded });
    expect(h.panel.pending).toBeUndefined();
    expect(h.panel.pendingTaken).toBe(false);
  });

  it("a timed-out feed is classed as a timeout", async () => {
    fetchMock.mockRejectedValue(
      Object.assign(new Error("This operation was aborted"), {
        name: "AbortError",
      }),
    );
    const h = manifestHarness();

    await expect(h.panel.fetchManifest("auto")).rejects.toThrow("aborted");
    expect(h.telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "whats_new_feed_unavailable",
      { reason: "timeout", trigger: "auto", fallback: "none" },
    );
  });
});
