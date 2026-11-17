import { describe, expect, it, jest } from "@jest/globals";
import { QueryResultPanel } from "../../webview_provider/queryResultPanel";

/**
 * The first preview in a window opens Query Results, whose webview loads
 * while the query runs. A message posted before the webview's script reports
 * ready is lost, so the panel queues what it sends until then and replays it
 * in order. The result (or error) used to be posted straight away and lost,
 * while the queued loading state was replayed over it: the panel stayed on
 * "Cancel query" with the query already finished.
 */

type Posted = { command: string } & Record<string, unknown>;

/** A Query Results panel whose bottom view exists but whose webview hasn't
 * loaded. `shown()` lists what the webview received: only messages posted
 * after `load()`. */
function panelLoading() {
  const panel = Object.create(QueryResultPanel.prototype) as QueryResultPanel &
    Record<string, unknown>;
  let loaded = false;
  const received: Posted[] = [];
  const postMessage = jest.fn(async (message: Posted) => {
    if (loaded) {
      received.push(message);
    }
    return loaded;
  });
  const view = { show: jest.fn(), webview: { postMessage } };
  Object.assign(panel, {
    _panel: view,
    _bottomPanel: view,
    isWebviewReady: false,
    incomingMessages: [],
    dbtTerminal: { debug: jest.fn(), warn: jest.fn(), info: jest.fn() },
    queryManifestService: { getProject: () => undefined },
  });
  const load = () => {
    loaded = true;
    (panel as unknown as { onWebviewReady(): void }).onWebviewReady();
  };
  const renders = () =>
    received.filter((m) =>
      ["renderLoading", "renderQuery", "renderError", "resetState"].includes(
        m.command,
      ),
    );
  return { panel, load, renders };
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

describe("Query Results before its webview is ready", () => {
  it("shows the rows of a query that finished before the webview loaded", async () => {
    const { panel, load, renders } = panelLoading();

    await panel.executeQuery(
      "select * from {{ ref('a') }}",
      execution(Promise.resolve(output)),
      "",
    );
    load();

    expect(renders().map((m) => m.command)).toEqual([
      "renderLoading",
      "renderQuery",
    ]);
    expect(renders()[1]).toMatchObject({
      columnNames: ["id"],
      rows: [{ id: 1 }],
      compiled_sql: "select 1 as id",
    });
  });

  it("shows the error of a query that failed before the webview loaded", async () => {
    const { panel, load, renders } = panelLoading();

    await panel.executeQuery(
      "select * from missing",
      execution(Promise.reject(new Error("relation missing does not exist"))),
      "",
    );
    load();

    expect(renders().map((m) => m.command)).toEqual([
      "renderLoading",
      "renderError",
    ]);
    expect(renders()[1]).toMatchObject({
      error: { message: "Error: relation missing does not exist" },
      raw_sql: "select * from missing",
    });
  });

  it("posts straight to a webview that is already ready", async () => {
    const { panel, load, renders } = panelLoading();
    load();

    await panel.executeQuery(
      "select 1",
      execution(Promise.resolve(output)),
      "",
    );

    expect(renders().map((m) => m.command)).toEqual([
      "renderLoading",
      "renderQuery",
    ]);
  });

  it("replays a reset that came before the webview loaded, after the loading state", async () => {
    const { panel, load, renders } = panelLoading();
    const loading = panel as unknown as {
      transmitLoading(): Promise<void>;
      transmitReset(): Promise<void>;
    };

    await loading.transmitLoading();
    await loading.transmitReset();
    load();

    expect(renders().map((m) => m.command)).toEqual([
      "renderLoading",
      "resetState",
    ]);
  });
});
