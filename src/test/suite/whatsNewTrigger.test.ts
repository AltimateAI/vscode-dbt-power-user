import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { workspace } from "vscode";
import { WhatsNewPanel } from "../../webview_provider/whatsNewPanel";

const LAST_SEEN_VERSION_KEY = "whatsNew.lastSeenVersion";

/**
 * Drives `checkAndShowOnActivation` against a fake globalState so a whole
 * upgrade sequence can be replayed. Hand-testing this is close to impossible:
 * activation persists the current version whether or not the page opened, so
 * each manual reload consumes the trigger and the next attempt tests nothing.
 */
const activationHarness = (
  opts: { enabled?: boolean; feedDown?: boolean; deferred?: boolean } = {},
) => {
  const store = new Map<string, unknown>();
  const shown: string[] = [];
  const manifest = { product: "dbt-power-user", version: "x", items: [] };

  const container = {
    extensionVersion: "0.0.0",
    getFromGlobalState: (key: string) => store.get(key),
    setToGlobalState: (key: string, value: unknown): void => {
      store.set(key, value);
    },
  };

  // Only these two collaborators are reachable from the method under test, so
  // the instance is built directly rather than through the DI container.
  const panel = Object.create(WhatsNewPanel.prototype) as Record<
    string,
    unknown
  > & {
    checkAndShowOnActivation: () => Promise<void>;
    serveManifest: (id: string) => Promise<void>;
  };
  panel.dbtProjectContainer = container;
  panel.show = (trigger: string) => shown.push(trigger);
  const dbtTerminal = { debug: jest.fn(), warn: jest.fn(), error: jest.fn() };
  const responses: Record<string, unknown>[] = [];
  panel.dbtTerminal = dbtTerminal;
  panel.telemetry = { sendTelemetryEvent: jest.fn() };
  panel.sendResponseToWebview = (r: Record<string, unknown>) => {
    responses.push(r);
  };
  // The automatic open waits for the feed; a failed fetch is already logged
  // and reported inside fetchManifest, so here it only rejects.
  let resolveFetch: (m: typeof manifest) => void = () => undefined;
  const fetchManifest = jest.fn(() => {
    if (opts.feedDown) {
      return Promise.reject(new Error("Feed request failed with 403"));
    }
    if (opts.deferred) {
      return new Promise<typeof manifest>((resolve) => {
        resolveFetch = resolve;
      });
    }
    return Promise.resolve(manifest);
  });
  panel.fetchManifest = fetchManifest;

  (workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: (_key: string, fallback: boolean) => opts.enabled ?? fallback,
  });

  return {
    shown,
    manifest,
    fetchManifest,
    pending: () => panel.pending as Promise<unknown> | undefined,
    container,
    panel,
    dbtTerminal,
    responses,
    resolveFetch: (m: typeof manifest) => resolveFetch(m),
    /** The user runs "Show What's New": the panel exists, the page asks. */
    openManually: () => {
      panel._panel = {};
      return panel.serveManifest("req");
    },
    lastSeen: () => store.get(LAST_SEEN_VERSION_KEY),
    setLastSeen: (v: string) => store.set(LAST_SEEN_VERSION_KEY, v),
    /** Simulate the extension activating while reporting `version`. */
    activateAs: async (version: string) => {
      container.extensionVersion = version;
      await panel.checkAndShowOnActivation();
    },
  };
};

describe("WhatsNewPanel.checkAndShowOnActivation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("stays silent on a fresh install but records the version", async () => {
    const h = activationHarness();
    await h.activateAs("0.62.1");
    // A first-time user gets the setup walkthrough, not a changelog for
    // changes they were never around for.
    expect(h.shown).toEqual([]);
    expect(h.lastSeen()).toBe("0.62.1");
  });

  it("opens once on a minor upgrade, then stays silent on reload", async () => {
    const h = activationHarness();
    h.setLastSeen("0.62.1");

    await h.activateAs("0.63.0");
    expect(h.shown).toEqual(["auto"]);
    expect(h.lastSeen()).toBe("0.63.0");

    // Reloading the window must not re-open the page.
    await h.activateAs("0.63.0");
    expect(h.shown).toEqual(["auto"]);
  });

  it("keeps the page closed when the feed is unreachable and nothing is cached", async () => {
    // Upgrading on a network that blocks the feed must not greet the user with
    // an error page; the version is still recorded so the next upgrade is a
    // fresh decision, not a backlog.
    const h = activationHarness({ feedDown: true });
    h.setLastSeen("0.62.1");

    await h.activateAs("0.63.0");
    expect(h.fetchManifest).toHaveBeenCalledWith("auto");
    expect(h.shown).toEqual([]);
    expect(h.pending()).toBeUndefined();
    expect(h.lastSeen()).toBe("0.63.0");
  });

  it("fetches before opening and keeps the manifest for the page", async () => {
    const h = activationHarness();
    h.setLastSeen("0.62.1");

    await h.activateAs("0.63.0");
    expect(h.fetchManifest).toHaveBeenCalledTimes(1);
    expect(h.shown).toEqual(["auto"]);
    await expect(h.pending()).resolves.toBe(h.manifest);
  });

  it("a manual open while the activation fetch is in flight shares that fetch", async () => {
    const h = activationHarness({ deferred: true });
    h.setLastSeen("0.62.1");

    const activation = h.activateAs("0.63.0"); // fetch still in flight
    const manual = h.openManually(); // the user runs the command meanwhile
    h.resolveFetch(h.manifest);
    await Promise.all([activation, manual]);

    expect(h.fetchManifest).toHaveBeenCalledTimes(1);
    expect(h.responses[0]).toMatchObject({ status: true, data: h.manifest });
    // The page the user opened is already in front; nothing to open on top.
    expect(h.shown).toEqual([]);
    expect(h.pending()).toBeUndefined();
  });

  it("a manual page closed before the shared fetch settles is not reopened", async () => {
    const h = activationHarness({ deferred: true });
    h.setLastSeen("0.62.1");

    const activation = h.activateAs("0.63.0"); // fetch still in flight
    const manual = h.openManually(); // the page's request takes the fetch
    h.panel._panel = undefined; // the user closes the page before it settles
    h.resolveFetch(h.manifest);
    await Promise.all([activation, manual]);

    // The user has had and dismissed the page; nothing comes back on its own.
    expect(h.shown).toEqual([]);
    expect(h.fetchManifest).toHaveBeenCalledTimes(1);
    expect(h.pending()).toBeUndefined();
  });

  it("a page that fails to open is logged, and activation still settles", async () => {
    const h = activationHarness();
    h.setLastSeen("0.62.1");
    h.panel.show = () => {
      throw new Error("no webview host");
    };

    await expect(h.activateAs("0.63.0")).resolves.toBeUndefined();
    expect(h.dbtTerminal.error).toHaveBeenCalledWith(
      "whatsNew:checkAndShowOnActivation",
      expect.any(String),
      expect.any(Error),
    );
    expect(h.pending()).toBeUndefined();
  });

  it("a failing state read is logged, and activation still settles", async () => {
    const h = activationHarness();
    h.container.getFromGlobalState = () => {
      throw new Error("storage gone");
    };

    await expect(h.activateAs("0.63.0")).resolves.toBeUndefined();
    expect(h.dbtTerminal.error).toHaveBeenCalledTimes(1);
    expect(h.shown).toEqual([]);
  });

  it("does not touch the feed when there is nothing to open", async () => {
    const h = activationHarness();
    h.setLastSeen("0.62.1");

    await h.activateAs("0.62.2");
    expect(h.fetchManifest).not.toHaveBeenCalled();
    expect(h.shown).toEqual([]);
  });

  it("replays a realistic release sequence, opening only on minor bumps", async () => {
    const h = activationHarness();
    h.setLastSeen("0.62.1");

    for (const version of ["0.62.2", "0.62.3", "0.63.0", "0.63.1", "1.0.0"]) {
      await h.activateAs(version);
    }

    expect(h.shown).toEqual(["auto", "auto"]);
    expect(h.lastSeen()).toBe("1.0.0");
  });

  it("records the version even when suppressed, so no upgrade double-prompts", async () => {
    // The persist happens before the decision: a patch release consumes
    // nothing, but the stored version still advances.
    const h = activationHarness();
    h.setLastSeen("0.62.1");

    await h.activateAs("0.62.9");
    expect(h.shown).toEqual([]);
    expect(h.lastSeen()).toBe("0.62.9");
  });

  it("never opens when the user disabled the setting", async () => {
    const h = activationHarness({ enabled: false });
    h.setLastSeen("0.62.1");

    await h.activateAs("0.63.0");
    expect(h.shown).toEqual([]);
    // Still tracked, so re-enabling doesn't fire a stale backlog.
    expect(h.lastSeen()).toBe("0.63.0");
  });
});

// `isMinorOrMajorUpgrade` is the rule that decides whether the What's New page
// opens by itself after an update. It's the feature's most user-visible
// behaviour and can't practically be hand-tested across every version
// transition — each manual check consumes the trigger, because activation
// persists the current version whether or not the page opened.
describe("WhatsNewPanel.isMinorOrMajorUpgrade", () => {
  describe("opens on a minor or major upgrade", () => {
    it.each([
      ["0.62.1", "0.63.0", "minor bump"],
      ["0.62.1", "0.63.4", "minor bump carrying a patch"],
      ["0.62.1", "1.0.0", "major bump"],
      ["0.9.9", "1.0.0", "major rollover"],
      ["1.2.3", "2.0.0", "major bump from a released major"],
      ["0.62.1", "0.70.0", "several minors at once (skipped releases)"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(true);
    });
  });

  describe("stays silent on patch-only or non-upgrades", () => {
    it.each([
      ["0.62.1", "0.62.2", "patch bump"],
      ["0.62.1", "0.62.11", "patch bump, multi-digit"],
      ["0.62.1", "0.62.1", "same version (a plain reload)"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(false);
    });
  });

  describe("never opens when going backwards", () => {
    // Downgrades happen when a user rolls back a release or installs an older
    // VSIX. Showing "What's New" for changes they just lost would be wrong.
    it.each([
      ["0.63.0", "0.62.1", "minor downgrade"],
      ["1.0.0", "0.9.9", "major downgrade"],
      ["0.62.2", "0.62.1", "patch downgrade"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(false);
    });
  });

  describe("tolerates version strings it can't read", () => {
    // Better to stay silent than to pop the page open on a value we failed to
    // parse — a spurious auto-open is more annoying than a missed one.
    it.each([
      ["", "0.63.0", "empty previous"],
      ["not-a-version", "0.63.0", "unparseable previous"],
      ["0.62.1", "", "empty current"],
      ["0.62.1", "garbage", "unparseable current"],
      ["0.62", "0.63.0", "previous missing patch segment"],
    ])("%s -> %s (%s)", (prev, curr) => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(prev, curr)).toBe(false);
    });
  });

  describe("handles real-world version shapes", () => {
    it("ignores a pre-release suffix and compares the numeric core", () => {
      expect(
        WhatsNewPanel.isMinorOrMajorUpgrade("0.62.1", "0.63.0-beta.1"),
      ).toBe(true);
    });

    it("does not open for a pre-release of the same minor", () => {
      expect(
        WhatsNewPanel.isMinorOrMajorUpgrade("0.62.1", "0.62.2-beta.1"),
      ).toBe(false);
    });

    it("tolerates surrounding whitespace", () => {
      expect(WhatsNewPanel.isMinorOrMajorUpgrade(" 0.62.1 ", " 0.63.0 ")).toBe(
        true,
      );
    });
  });
});
