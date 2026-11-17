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
    bottomWebview: bottom.webview,
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

/** Opens an "Open in Tab" panel; `close()` disposes it. As in VS Code, the
 * panel is marked disposed before its dispose listeners run, and reading its
 * `webview` then throws. */
function openTab(panel: QueryResultPanel) {
  const tab = fakeWebview();
  const disposeListeners: (() => void)[] = [];
  let disposed = false;
  (window as unknown as Record<string, unknown>).createWebviewPanel = jest.fn(
    () => ({
      get webview() {
        if (disposed) {
          throw new Error("Webview is disposed");
        }
        return tab.webview;
      },
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
  const close = () => {
    disposed = true;
    disposeListeners.forEach((l) => l());
  };
  return { tab, close };
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

describe("the time shown with a result", () => {
  it("is the duration the extension measured, in seconds, sent with the rows", async () => {
    const { panel, bottom } = panelLoading();
    const slow = new Promise<typeof output>((resolve) =>
      setTimeout(() => resolve(output), 300),
    );

    await panel.executeQuery("select 1", execution(slow), "");
    await bottom.load();

    const rows = bottom.received.find((m) => m.command === "renderQuery");
    expect(typeof rows?.elapsedTime).toBe("number");
    expect(rows?.elapsedTime as number).toBeGreaterThanOrEqual(0.3);
    expect(rows?.elapsedTime as number).toBeLessThan(2);
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

  it("hands a result it was waiting for to the bottom view when it closes", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    let finish!: (value: typeof output) => void;
    const running = panel.executeQuery(
      "select 1",
      execution(new Promise((resolve) => (finish = resolve))),
      "",
    );
    // The loading state reached the bottom view; Open in Tab while the query runs.
    await new Promise((resolve) => setImmediate(resolve));
    const { close } = openTab(panel);
    finish(output);
    await running;

    close();

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect((panel as unknown as Record<string, unknown>)._panel).toBe(
      (panel as unknown as Record<string, unknown>)._bottomPanel,
    );
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
