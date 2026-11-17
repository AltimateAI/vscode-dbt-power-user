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
 *
 * A run renders in one place, fixed when it starts: the tab a Query History
 * or Bookmark "Execute" opened for it, or otherwise the bottom view.
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
  /** A message from the webview's script, such as a button click. */
  const send = async (message: Posted) => {
    await Promise.all(listeners.map((l) => l(message)));
  };
  const renders = () =>
    received.filter((m) => RENDERS.includes(m.command)).map((m) => m.command);
  return { webview, load, send, received, renders };
}

const tick = () => new Promise((resolve) => setImmediate(resolve));

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
    bottomQueue: [],
    tabQueues: new WeakMap(),
    tabResults: new WeakMap(),
    readyWebviews: new WeakSet(),
    dbtTerminal: { debug: jest.fn(), warn: jest.fn(), info: jest.fn() },
    telemetry: { sendTelemetryEvent: jest.fn(), sendTelemetryError: jest.fn() },
    queryManifestService: { getProject: () => undefined },
    renderWebviewView: jest.fn(),
    // Never settles, and starts no timer.
    checkIfWebviewReady: () => new Promise(() => {}),
  });
  (panel as unknown as { setupWebviewHooks(): void }).setupWebviewHooks();
  return { panel, bottom };
}

/** The next Query Results tab VS Code creates; `close()` disposes it. As in
 * VS Code, the panel is marked disposed before its dispose listeners run, and
 * reading its `webview` then throws. */
function nextTab() {
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
  const close = () => {
    disposed = true;
    disposeListeners.forEach((l) => l());
  };
  return { tab, close };
}

/** Opens an "Open in Tab" panel, which shows the result it asks for when it
 * loads; `snapshot()` is that request. */
function openTab(panel: QueryResultPanel) {
  const opened = nextTab();
  // As "Open in Tab" does before it opens the tab.
  (panel as unknown as Record<string, unknown>)._queryTabData = {
    compiledCodeMarkup: "select * from customers",
  };
  void (
    panel as unknown as {
      createQueryResultsPanelVirtualDocument(name: string): Promise<void>;
    }
  ).createQueryResultsPanelVirtualDocument("Query results");
  const snapshot = () =>
    opened.tab.send({ command: "getQueryTabData", syncRequestId: "1" });
  return { ...opened, snapshot };
}

/** A Query History or Bookmark "Execute" of `result`: the panel opens a tab
 * for the run and starts it once the tab is ready (`tabReady()`), through the
 * project, which fires an `executeQuery` event carrying the tab.
 * `finished()` waits for the run. The button sends no `limit`; with one, the
 * run goes through the project's limited variant. */
function historyExecute(
  panel: QueryResultPanel,
  result: Promise<typeof output>,
  limit?: number,
) {
  const state = panel as unknown as Record<string, unknown>;
  const opened = nextTab();
  let tabReady!: () => void;
  const ready = new Promise<void>((resolve) => (tabReady = resolve));
  state.checkIfWebviewReady = () => ready;
  const runs: Promise<unknown>[] = [];
  const executeQuery = panel.executeQuery.bind(panel);
  state.executeQuery = (
    ...args: Parameters<QueryResultPanel["executeQuery"]>
  ) => {
    const run = executeQuery(...args);
    runs.push(run);
    return run;
  };
  // As the project does: an `executeQuery` event carrying the tab.
  const fire = (query: string, tab: unknown) =>
    (panel as unknown as { onEvent(event: unknown): Promise<void> }).onEvent({
      command: "executeQuery",
      payload: { query, fn: execution(result), projectName: "", tab },
    });
  state.getProject = async () => ({
    executeSQLOnQueryPanel: (
      query: string,
      _modelName: string,
      _previewMode: string,
      _uri: unknown,
      tab: unknown,
    ) => fire(query, tab),
    executeSQLWithLimitOnQueryPanel: (
      query: string,
      _modelName: string,
      _limit: number,
      _previewMode: string,
      _uri: unknown,
      tab: unknown,
    ) => fire(query, tab),
  });
  const started = (
    panel as unknown as { executeIncomingQuery(m: unknown): Promise<void> }
  ).executeIncomingQuery({
    query: "select * from orders",
    projectName: "jaffle_shop",
    editorName: "History",
    limit,
  });
  const finished = async () => {
    await started;
    await Promise.all(runs);
  };
  return { ...opened, tabReady: () => tabReady(), finished };
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
      transmitLoading(to: "bottom"): Promise<void>;
      transmitReset(to: "bottom"): Promise<void>;
    };

    await loading.transmitLoading("bottom");
    await loading.transmitReset("bottom");
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

describe("a bottom view replaced before it loads", () => {
  it("passes what waited for it to the view that replaces it", async () => {
    const { panel } = panelLoading();
    const state = panel as unknown as Record<string, unknown>;
    await (
      panel as unknown as { transmitLoading(to: "bottom"): Promise<void> }
    ).transmitLoading("bottom");
    // The view is closed before it loads and opened again: a new webview, as
    // `resolveWebviewView` records it.
    const replacement = fakeWebview();
    const view = { show: jest.fn(), webview: replacement.webview };
    state._panel = view;
    state._bottomPanel = view;
    state.bottomWebview = replacement.webview;
    (panel as unknown as { setupWebviewHooks(): void }).setupWebviewHooks();

    await replacement.load();

    expect(replacement.renders()).toEqual(["renderLoading"]);
  });
});

describe("render messages sent before the bottom view exists", () => {
  it("wait for the bottom view, even when a tab loads first", async () => {
    const { panel, bottom } = panelLoading();
    const state = panel as unknown as Record<string, unknown>;
    const view = state._bottomPanel;
    state._panel = undefined;
    state._bottomPanel = undefined;
    state.bottomWebview = undefined;
    await (
      panel as unknown as { transmitLoading(to: "bottom"): Promise<void> }
    ).transmitLoading("bottom");
    // A tab opens and loads first.
    const { tab } = openTab(panel);
    await tab.load();
    // Then the bottom view resolves and loads.
    state._panel = view;
    state._bottomPanel = view;
    state.bottomWebview = bottom.webview;

    await bottom.load();

    expect(tab.renders()).toEqual([]);
    expect(bottom.renders()).toEqual(["renderLoading"]);
  });
});

describe("an Open in Tab panel", () => {
  it("doesn't hold back the bottom view once it closes before loading", async () => {
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

  it("doesn't take a preview's loading state while it loads hidden", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    // Open in Tab, then straight back to the SQL file: the tab loads hidden.
    const opened = openTab(panel);
    const { tab } = opened;
    let finish!: (value: typeof output) => void;
    const running = panel.executeQuery(
      "select * from orders",
      execution(new Promise((resolve) => (finish = resolve))),
      "",
    );
    await new Promise((resolve) => setImmediate(resolve));
    // The tab loads and asks for its result.
    await tab.load();
    await opened.snapshot();
    finish(output);
    await running;

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(tab.renders()).toEqual([]);
  });

  it("doesn't take a preview that finished before it loaded", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    // Open in Tab, then straight back to the SQL file; the preview finishes
    // while the hidden tab is still the current panel, and only then it loads.
    const { tab } = openTab(panel);
    await panel.executeQuery(
      "select * from orders",
      execution(Promise.resolve(output)),
      "",
    );

    await tab.load();

    expect(tab.renders()).toEqual([]);
    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
  });

  it("closing never puts an older result after a newer one in the bottom view", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const { close } = openTab(panel);
    // A runs while the unloaded tab is current; B runs after it.
    await panel.executeQuery(
      "select a",
      execution(Promise.resolve(output)),
      "",
    );
    const newer = { ...output, compiled_sql: "select 2 as id" };
    await panel.executeQuery("select b", execution(Promise.resolve(newer)), "");
    const shown = bottom.received.length;

    close();

    expect(
      bottom.received
        .filter((m) => m.command === "renderQuery")
        .map((m) => m.compiled_sql),
    ).toEqual(["select 1 as id", "select 2 as id"]);
    expect(bottom.received.length).toBe(shown);
  });

  it("opened while a preview runs doesn't take its result, and closing it doesn't throw", async () => {
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
    const { tab, close } = openTab(panel);
    finish(output);
    await running;

    expect(() => close()).not.toThrow();

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(tab.renders()).toEqual([]);
    expect((panel as unknown as Record<string, unknown>)._panel).toBe(
      (panel as unknown as Record<string, unknown>)._bottomPanel,
    );
  });

  it("doesn't hold back the bottom view while it is still open", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    // The tab hasn't loaded, so the panel still points at it.
    openTab(panel);

    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
  });

  it("starts runs whose results render in the bottom view, once loaded", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const { tab, snapshot } = openTab(panel);
    await tab.load();
    await snapshot();
    // Then its run button.

    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(tab.renders()).toEqual([]);
  });
});

describe("an Open in Tab panel's own result", () => {
  const responses = (view: ReturnType<typeof fakeWebview>) =>
    view.received
      .filter((m) => m.command === "response")
      .map((m) => (m.args as { body: unknown }).body);

  it("reaches it when it loads only after a preview has finished", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    // Open in Tab, hidden at once; a preview runs and finishes before it loads.
    const { tab, snapshot } = openTab(panel);
    await panel.executeQuery(
      "select * from orders",
      execution(Promise.resolve(output)),
      "",
    );

    await tab.load();
    await snapshot();

    expect(responses(tab)).toEqual([
      { compiledCodeMarkup: "select * from customers" },
    ]);
    expect(responses(bottom)).toEqual([]);
  });

  it("isn't taken by the bottom view's own data request", async () => {
    const { panel, bottom } = panelLoading();
    const { tab, snapshot } = openTab(panel);
    // The bottom view loads, and asks for its data, before the tab does.
    await bottom.load();
    await bottom.send({ command: "getQueryTabData", syncRequestId: "2" });

    await tab.load();
    await snapshot();

    expect(responses(bottom)).toEqual([undefined]);
    expect(responses(tab)).toEqual([
      { compiledCodeMarkup: "select * from customers" },
    ]);
  });
});

describe("a Query History or Bookmark Execute", () => {
  it("shows the run in the tab it opened, not in the bottom view", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const run = historyExecute(panel, Promise.resolve(output));
    await tick();
    await run.tab.load();
    run.tabReady();

    await run.finished();

    expect(run.tab.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(bottom.renders()).toEqual([]);
  });

  it("shows the run once its tab loads, when the run started first", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const run = historyExecute(panel, Promise.resolve(output));
    // The wait ends before this tab loads (another webview reported ready).
    run.tabReady();
    await run.finished();
    expect(run.tab.renders()).toEqual([]);

    await run.tab.load();

    expect(run.tab.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(bottom.renders()).toEqual([]);
  });

  it("drops a run whose tab is closed while it runs, without throwing", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    let finish!: (value: typeof output) => void;
    const run = historyExecute(
      panel,
      new Promise((resolve) => (finish = resolve)),
    );
    await tick();
    await run.tab.load();
    run.tabReady();
    await tick();

    run.close();
    finish(output);

    await expect(run.finished()).resolves.toBeUndefined();
    expect(run.tab.renders()).toEqual(["renderLoading"]);
    expect(bottom.renders()).toEqual([]);
  });

  it("leaves the next preview to the bottom view", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const run = historyExecute(panel, Promise.resolve(output));
    await tick();
    await run.tab.load();
    run.tabReady();
    await run.finished();

    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );

    expect(bottom.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(run.tab.renders()).toEqual(["renderLoading", "renderQuery"]);
  });
});

describe("a Query History or Bookmark Execute with a limit", () => {
  it("also shows the run in the tab it opened", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const run = historyExecute(panel, Promise.resolve(output), 50);
    await tick();
    await run.tab.load();
    run.tabReady();

    await run.finished();

    expect(run.tab.renders()).toEqual(["renderLoading", "renderQuery"]);
    expect(bottom.renders()).toEqual([]);
  });
});

describe("a Query History or Bookmark Execute's view type", () => {
  it("goes to its tab, even when a preview has pointed the panel back meanwhile", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const run = historyExecute(panel, Promise.resolve(output));
    await tick();
    await run.tab.load();
    // A preview finishes while the tab's wait goes on.
    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );
    run.tabReady();

    await run.finished();

    const viewTypes = (view: ReturnType<typeof fakeWebview>) =>
      view.received.filter((m) => m.command === "updateViewType");
    expect(viewTypes(run.tab)).toHaveLength(1);
    expect(viewTypes(bottom)).toEqual([]);
  });
});

describe("a request from a webview", () => {
  const answered = (view: ReturnType<typeof fakeWebview>) =>
    view.received
      .filter((m) => m.command !== "focus" && !RENDERS.includes(m.command))
      .map((m) =>
        m.command === "response"
          ? (m.args as { syncRequestId: string }).syncRequestId
          : m.command,
      );

  it("from a loaded tab is answered to the tab, once the panel points at the bottom view", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const { tab, snapshot } = openTab(panel);
    await tab.load();
    await snapshot();

    // Answered by the base provider, and by the panel itself.
    await tab.send({ command: "getProjectAdapterType", syncRequestId: "a" });
    await tab.send({ command: "clearQueryHistory", syncRequestId: "b" });
    await tab.send({ command: "getQueryPanelContext", syncRequestId: "c" });
    await tick();

    expect(answered(tab)).toEqual(["1", "a", "b", "getContext"]);
    expect(answered(bottom)).toEqual([]);
  });

  it("from the bottom view is answered to it while an unloaded tab is current", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const { tab } = openTab(panel);

    await bottom.send({ command: "getQueryHistory", syncRequestId: "d" });
    await bottom.send({ command: "getProjectAdapterType", syncRequestId: "e" });
    await tick();

    expect(answered(bottom)).toEqual(["queryHistory", "e"]);
    expect(tab.received).toEqual([]);
  });
});

describe("Cancel", () => {
  it("resets the view it was clicked in", async () => {
    const { panel, bottom } = panelLoading();
    await bottom.load();
    const run = historyExecute(panel, new Promise(() => {}));
    await tick();
    await run.tab.load();
    run.tabReady();
    await tick();

    await run.tab.send({ command: "cancelQuery" });

    expect(run.tab.renders()).toEqual(["renderLoading", "resetState"]);
    expect(bottom.renders()).toEqual([]);

    await bottom.send({ command: "cancelQuery" });

    expect(bottom.renders()).toEqual(["resetState"]);
  });
});
