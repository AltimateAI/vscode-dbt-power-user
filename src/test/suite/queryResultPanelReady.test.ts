import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { window } from "vscode";
import { QueryResultPanel } from "../../webview_provider/queryResultPanel";

/**
 * The first preview in a window opens Query Results, whose webview loads
 * while the query runs. A message posted before the webview's script reports
 * ready is lost, so the panel queues what it sends until then and replays it
 * in order. The result (or error) used to be posted straight away and lost,
 * while the queued loading state was replayed over it: the panel stayed on
 * "Cancel query" with the query already finished.
 *
 * Readiness belongs to each webview: the bottom view and every "Open in Tab"
 * panel load on their own, and a tab closed before it loads must not hold
 * back the bottom view.
 */

type Posted = { command: string } & Record<string, unknown>;
type Listener = (message: unknown) => unknown;

const RENDERS = ["renderLoading", "renderQuery", "renderError", "resetState"];

/** A webview that receives only what is posted after its script has loaded,
 * and reports ready through the panel's own message listener. */
function fakeWebview() {
  let loaded = false;
  const listeners: Listener[] = [];
  const received: Posted[] = [];
  const webview = {
    postMessage: jest.fn(async (message: Posted) => {
      if (loaded) {
        received.push(message);
      }
      return loaded;
    }),
    onDidReceiveMessage: jest.fn((listener: Listener) => {
      listeners.push(listener);
      return { dispose: jest.fn() };
    }),
  };
  const load = async () => {
    loaded = true;
    await Promise.all(listeners.map((l) => l({ command: "webview:ready" })));
  };
  const renders = () =>
    received.filter((m) => RENDERS.includes(m.command)).map((m) => m.command);
  return { webview, load, received, renders };
}

/** A Query Results panel with its bottom view resolved but not loaded. */
function panelLoading() {
  const panel = Object.create(QueryResultPanel.prototype) as QueryResultPanel &
    Record<string, unknown>;
  const bottom = fakeWebview();
  const view = { show: jest.fn(), webview: bottom.webview };
  Object.assign(panel, {
    _panel: view,
    _bottomPanel: view,
    _disposables: [],
    isWebviewReady: false,
    incomingMessages: [],
    readyWebviews: new WeakSet(),
    dbtTerminal: { debug: jest.fn(), warn: jest.fn(), info: jest.fn() },
    queryManifestService: { getProject: () => undefined },
    renderWebviewView: jest.fn(),
    // Never settles, and starts no timer.
    checkIfWebviewReady: () => new Promise(() => {}),
  });
  (panel as unknown as { setupWebviewHooks(): void }).setupWebviewHooks();
  return { panel, bottom };
}

/** Opens an "Open in Tab" panel; `close()` disposes it. */
function openTab(panel: QueryResultPanel) {
  const tab = fakeWebview();
  const disposeListeners: (() => void)[] = [];
  (window as unknown as Record<string, unknown>).createWebviewPanel = jest.fn(
    () => ({
      webview: tab.webview,
      onDidDispose: jest.fn((listener: () => void) => {
        disposeListeners.push(listener);
        return { dispose: jest.fn() };
      }),
    }),
  );
  void (
    panel as unknown as {
      createQueryResultsPanelVirtualDocument(name: string): Promise<void>;
    }
  ).createQueryResultsPanelVirtualDocument("Query results");
  return { tab, close: () => disposeListeners.forEach((l) => l()) };
}

const output = {
  table: { column_names: ["id"], column_types: ["integer"], rows: [[1]] },
  compiled_sql: "select 1 as id",
  modelName: "b",
};

function execution(result: Promise<typeof output>) {
  return Promise.resolve({
    executeQuery: () => result,
    cancel: jest.fn(),
  }) as unknown as Parameters<QueryResultPanel["executeQuery"]>[1];
}

afterEach(() => {
  delete (window as unknown as Record<string, unknown>).createWebviewPanel;
});

describe("Query Results before its webview is ready", () => {
  it("shows the rows of a query that finished before the webview loaded", async () => {
    const { panel, bottom } = panelLoading();

    await panel.executeQuery(
      "select * from {{ ref('a') }}",
      execution(Promise.resolve(output)),
      "",
    );
    await bottom.load();

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(
      bottom.received.find((m) => m.command === "renderQuery"),
    ).toMatchObject({
      columnNames: ["id"],
      rows: [{ id: 1 }],
      compiled_sql: "select 1 as id",
    });
  });

  it("shows the error of a query that failed before the webview loaded", async () => {
    const { panel, bottom } = panelLoading();

    await panel.executeQuery(
      "select * from missing",
      execution(Promise.reject(new Error("relation missing does not exist"))),
      "",
    );
    await bottom.load();

    expect(bottom.renders()).toEqual(["renderLoading", "renderError"]);
    expect(
      bottom.received.find((m) => m.command === "renderError"),
    ).toMatchObject({
      error: { message: "Error: relation missing does not exist" },
      raw_sql: "select * from missing",
    });
  });

  it("posts straight to a webview that is already ready", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();

    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
  });

  it("replays a reset that came before the webview loaded, after the loading state", async () => {
    const { panel, bottom } = panelLoading();
    const loading = panel as unknown as {
      transmitLoading(): Promise<void>;
      transmitReset(): Promise<void>;
    };

    await loading.transmitLoading();
    await loading.transmitReset();
    await bottom.load();

    expect(bottom.renders()).toEqual(["renderLoading", "resetState"]);
  });
});

describe("a message queued before any panel exists", () => {
  it("goes to the first webview that loads, even while another is current", async () => {
    const { panel, bottom } = panelLoading();
    const state = panel as unknown as Record<string, unknown>;
    const view = state._bottomPanel;
    state._panel = undefined;
    await (
      panel as unknown as { transmitLoading(): Promise<void> }
    ).transmitLoading();
    // The bottom view resolves, then a tab opens before either has loaded.
    state._panel = view;
    openTab(panel);

    await bottom.load();

    expect(bottom.renders()).toEqual(["renderLoading"]);
  });
});

describe("an Open in Tab panel that never loads", () => {
  it("doesn't hold back the bottom view once it is closed", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const { close } = openTab(panel);

    close();
    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );
    await panel.executeQuery(
      "select 2",
      execution(Promise.resolve(output)),
      "",
    );

    expect(bottom.renders()).toEqual([
      "renderLoading",
      "renderQuery",
      "renderLoading",
      "renderQuery",
    ]);
  });

  it("doesn't hold back the bottom view while it is still open", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    openTab(panel);
    // Back on the bottom view, as `executeQuery` and the tab's data request leave it.
    const state = panel as unknown as Record<string, unknown>;
    state._panel = state._bottomPanel;

    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
  });
});
